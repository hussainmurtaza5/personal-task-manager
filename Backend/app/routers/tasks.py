from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database import get_db
from app.models.task import Task
from app.models.user import User
from app.schemas.task import TaskCreate, TaskResponse


router = APIRouter()


@router.post("/create", response_model=TaskResponse)
def create_task(
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
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.owner_id == current_user.id,
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return task


@router.put("/{task_id}/update", response_model=TaskResponse)
def update_task(
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
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    task.title = request.title
    task.description = request.description
    task.status = request.status
    task.priority = request.priority
    task.due_date = request.due_date

    db.commit()
    db.refresh(task)

    return task


@router.delete("/{task_id}/delete", response_model=TaskResponse)
def delete_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.owner_id == current_user.id,
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