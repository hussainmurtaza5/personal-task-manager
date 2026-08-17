from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database import get_db
from app.models.task import Task
from app.models.user import User
from app.models.workspace import Workspace
from app.schemas.task import TaskCreate, TaskResponse

router = APIRouter()


def get_workspace(
    workspace_id: int,
    current_user: User,
    db: Session,
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

    if not any(member.id == current_user.id for member in workspace.members):
        raise HTTPException(
            status_code=403,
            detail="Not authorized to access this workspace",
        )

    return workspace

# ------------------------------------------------------------------------
#            Create personal task routers (IDk how but they all work)
# ------------------------------------------------------------------------

@router.post(
    "/create",
    response_model=TaskResponse,
)
def create_personal_task(
    request: TaskCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    max_id = (
        db.query(func.max(Task.id))
        .filter(Task.owner_id == current_user.id)
        .scalar()
    )

    new_id = (max_id or 0) + 1

    new_task = Task(
        id=new_id,
        title=request.title,
        description=request.description,
        status=request.status,
        priority=request.priority,
        due_date=request.due_date,
        owner_id=current_user.id,
        workspace_id=None,
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.get(
    "/personal",
    response_model=list[TaskResponse],
)
def list_personal_tasks(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(Task)
        .filter(
            Task.owner_id == current_user.id,
            Task.workspace_id.is_(None),
        )
        .all()
    )

@router.get(
    "/{task_id}",
    response_model=TaskResponse,
)
def get_personal_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.owner_id == current_user.id,
            Task.workspace_id.is_(None),
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Personal task not found",
        )

    return task
@router.put(
    "/{task_id}/update",
    response_model=TaskResponse,
)
def update_personal_task(
    task_id: int,
    request: TaskCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.owner_id == current_user.id,
            Task.workspace_id.is_(None),
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Personal task not found",
        )

    task.title = request.title
    task.description = request.description
    task.status = request.status
    task.priority = request.priority
    task.due_date = request.due_date

    db.commit()
    db.refresh(task)

    return task


@router.delete(
    "/{task_id}/delete",
    response_model=TaskResponse,
)
def delete_personal_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.owner_id == current_user.id,
            Task.workspace_id.is_(None),
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Personal task not found",
        )

    db.delete(task)
    db.commit()

    return task
# ------------------------------------------------------------------------
#               Create workspace task routers (IDk how but they all work)
# ------------------------------------------------------------------------
@router.post(
    "/workspace/{workspace_id}/create",
    response_model=TaskResponse,
)
def create_workspace_task(
    workspace_id: int,
    request: TaskCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    get_workspace(
        workspace_id,
        current_user,
        db,
    )

    max_id = db.query(func.max(Task.id)).scalar()
    new_id = (max_id or 0) + 1

    new_task = Task(
        id=new_id,
        title=request.title,
        description=request.description,
        status=request.status,
        priority=request.priority,
        due_date=request.due_date,
        owner_id=current_user.id,
        workspace_id=workspace_id,
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.get(
    "/workspace/{workspace_id}",
    response_model=list[TaskResponse],
)
def list_tasks(
    workspace_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    workspace = get_workspace(
        workspace_id,
        current_user,
        db,
    )

    return workspace.tasks


@router.get(
    "/workspace/{workspace_id}/{task_id}",
    response_model=TaskResponse,
)
def get_task(
    workspace_id: int,
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    get_workspace(
        workspace_id,
        current_user,
        db,
    )

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.workspace_id == workspace_id,
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return task


@router.put(
    "/workspace/{workspace_id}/{task_id}/update",
    response_model=TaskResponse,
)
def update_task(
    workspace_id: int,
    task_id: int,
    request: TaskCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    get_workspace(
        workspace_id,
        current_user,
        db,
    )

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.workspace_id == workspace_id,
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    db.query(Task).filter(
    Task.id == task_id,
    Task.workspace_id == workspace_id,
        ).update(
    {
        "title": request.title,
        "description": request.description,
        "status": request.status,
        "priority": request.priority,
        "due_date": request.due_date,
    }
)
    db.commit()
    db.refresh(task)

    return task


@router.delete(
    "/workspace/{workspace_id}/{task_id}/delete",
    response_model=TaskResponse,
)
def delete_task(
    workspace_id: int,
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    get_workspace(
        workspace_id,
        current_user,
        db,
    )

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.workspace_id == workspace_id,
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    db.delete(task)
    db.commit()

    return task