from sqlalchemy import Column, Integer, String, DateTime, Table, ForeignKey, func
from sqlalchemy.orm import relationship

from app.database import Base


user_workspace = Table(
    "user_workspace",
    Base.metadata,
    Column(
        "user_id",
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        primary_key=True,
    ),
    Column(
        "workspace_id",
        Integer,
        ForeignKey("workspaces.id", ondelete="CASCADE"),
        primary_key=True,
    ),
)


class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # User who owns the workspace
    owner_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    # Users who are members of this workspace
    members = relationship(
        "User",
        secondary=user_workspace,
        back_populates="workspaces",
    )

    # Tasks belonging to this workspace
    tasks = relationship(
        "Task",
        back_populates="workspace",
        cascade="all, delete-orphan",
    )

    # Workspace owner
    owner = relationship(
        "User",
        foreign_keys=[owner_id],
        back_populates="owned_workspaces",
    )