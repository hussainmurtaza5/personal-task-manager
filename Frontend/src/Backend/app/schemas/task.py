from datetime import datetime
from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    status: str = "pending"
    priority: int = 0
    due_date: datetime | None = None
    workspace_id: int | None = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None = None
    priority: int
    due_date: datetime | None = None
    status: str
    created_at: datetime
    owner_id: int
    workspace_id: int | None = None

    class Config:
        from_attributes = True