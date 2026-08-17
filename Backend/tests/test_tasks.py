from fastapi.testclient import TestClient

from app.auth.dependencies import get_current_user
from app.database import SessionLocal, Base, engine, get_db
from app.main import app
from app.models.task import Task
from app.models.user import User
from app.models.workspace import Workspace


def reset_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        db.query(Task).delete()
        db.query(Workspace).delete()
        db.query(User).delete()
        db.commit()

        user = User(username="alice", email="alice@example.com", hashed_password="secret")
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    finally:
        db.close()


def test_create_personal_task():
    user = reset_db()
    app.dependency_overrides[get_current_user] = lambda: user

    def override_get_db():
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

    client = TestClient(app)
    response = client.post("/tasks/create", json={"title": "Personal task"})

    assert response.status_code == 200, response.text
    data = response.json()
    assert data["title"] == "Personal task"
    assert data["owner_id"] == user.id
    assert data["workspace_id"] is None

    app.dependency_overrides.clear()
