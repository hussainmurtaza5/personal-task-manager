from typing import cast

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.auth.dependencies import get_current_user
from app.database import get_db
from app.models.workspace import Workspace
from app.models.user import User
from app.schemas.workspace import (
    WorkspaceCreate,
    WorkspaceResponse,
    AddMemberRequest,
)

router = APIRouter()


@router.post("/create", response_model=WorkspaceResponse)
def create_workspace(
    request: WorkspaceCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    current_user_db = db.merge(current_user)

    new_workspace = Workspace(
        name=request.name,
        description=request.description,
        owner_id=current_user_db.id,
    )

    new_workspace.members.append(current_user_db)

    db.add(new_workspace)
    db.commit()
    db.refresh(new_workspace)

    return new_workspace


@router.get("/", response_model=list[WorkspaceResponse])
def get_workspaces(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(Workspace)
        .join(Workspace.members)
        .filter(User.id == current_user.id)
        .all()
    )


@router.post(
    "/{workspace_id}/members",
    response_model=WorkspaceResponse,
)
def add_member(
    workspace_id: int,
    request: AddMemberRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    workspace = (
        db.query(Workspace)
        .filter(Workspace.id == workspace_id)
        .first()
    )

    if not workspace:
        raise HTTPException(
            status_code=404,
            detail="Workspace not found",
        )

    # Only the owner can add members
    workspace_owner_id = cast(int, workspace.owner_id)
    current_user_id = cast(int, current_user.id)

    if workspace_owner_id != current_user_id:
        raise HTTPException(
            status_code=403,
            detail="Only the workspace owner can manage members",
        )

    user_to_add = (
        db.query(User)
        .filter(
            or_(
                User.username == request.username_or_email,
                User.email == request.username_or_email,
            )
        )
        .first()
    )

    if not user_to_add:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    if any(member.id == user_to_add.id for member in workspace.members):
        raise HTTPException(
            status_code=400,
            detail="User is already a member of this workspace",
        )

    workspace.members.append(user_to_add)

    db.commit()
    db.refresh(workspace)

    return workspace
