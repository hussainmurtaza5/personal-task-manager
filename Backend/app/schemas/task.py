from datetime import datetime
from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    priority: int = 0
    due_date: datetime | None = None
    
class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None = None
    priority: int
    due_date: datetime | None = None
    status: str
    created_at: datetime
    owner_id: int
    class Config:
        from_attributes = True