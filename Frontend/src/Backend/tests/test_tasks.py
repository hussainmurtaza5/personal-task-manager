from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.auth.dependencies import get_current_user
from app.database import Base, get_db
from app.main import app
from app.models.user import User

test_engine = create_engine(
    "sqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


def reset_db():
    Base.metadata.drop_all(bind=test_engine)
    Base.metadata.create_all(bind=test_engine)
    db = TestingSessionLocal()
    try:
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
        db = TestingSessionLocal()
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


def test_create_multiple_personal_tasks():
    user = reset_db()
    app.dependency_overrides[get_current_user] = lambda: user

    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

    client = TestClient(app)

    first = client.post("/tasks/create", json={"title": "First task"})
    second = client.post("/tasks/create", json={"title": "Second task"})

    assert first.status_code == 200, first.text
    assert second.status_code == 200, second.text
    assert second.json()["id"] != first.json()["id"]

    app.dependency_overrides.clear()


def test_completed_personal_task_status_persists():
    user = reset_db()
    app.dependency_overrides[get_current_user] = lambda: user

    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

    client = TestClient(app)
    created = client.post("/tasks/create", json={"title": "Finish report"})
    task_id = created.json()["id"]
    updated = client.put(
        f"/tasks/{task_id}/update",
        json={
            "title": "Finish report",
            "description": None,
            "status": "completed",
            "priority": 0,
            "due_date": None,
        },
    )
    listed = client.get("/tasks/personal")

    assert created.status_code == 200, created.text
    assert updated.status_code == 200, updated.text
    assert listed.status_code == 200, listed.text
    assert listed.json()[0]["status"] == "completed"

    app.dependency_overrides.clear()


def test_create_workspace_and_list_membership():
    user = reset_db()
    app.dependency_overrides[get_current_user] = lambda: user

    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

    client = TestClient(app)

    created = client.post(
        "/workspaces/create",
        json={"name": "Product", "description": "Launch planning"},
    )
    listed = client.get("/workspaces/")

    assert created.status_code == 200, created.text
    assert created.json()["name"] == "Product"
    assert created.json()["owner_id"] == user.id
    assert [member["username"] for member in created.json()["members"]] == ["alice"]

    assert listed.status_code == 200, listed.text
    assert [workspace["name"] for workspace in listed.json()] == ["Product"]

    app.dependency_overrides.clear()
