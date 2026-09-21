from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from app.schemas.user import UserResponse

class WorkspaceCreate(BaseModel):
    name: str
    description: str | None = None


class WorkspaceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None = None
    created_at: datetime
    owner_id: int
    members: list[UserResponse] = Field(default_factory=list)


class AddMemberRequest(BaseModel):
    username_or_email: str