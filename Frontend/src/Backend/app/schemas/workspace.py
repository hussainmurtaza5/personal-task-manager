from datetime import datetime
from pydantic import BaseModel, Field
from app.schemas.user import UserResponse

class WorkspaceCreate(BaseModel):
    name: str
    description: str | None = None


class WorkspaceResponse(BaseModel):
    id: int
    name: str
    description: str | None = None
    created_at: datetime
    owner_id: int
    members: list[UserResponse] = Field(default_factory=list)

    class Config:
        from_attributes = True


class AddMemberRequest(BaseModel):
    username_or_email: str