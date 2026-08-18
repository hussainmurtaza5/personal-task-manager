from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
import app.models.user
import app.models.task
import app.models.workspace
from app.routers.auth import router as auth_router
from app.routers.tasks import router as task_router
from app.routers.workspaces import router as workspace_router

app = FastAPI(title="Personal Task Manager API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(task_router, prefix="/tasks", tags=["tasks"])
app.include_router(workspace_router, prefix="/workspaces", tags=["workspaces"])


@app.get("/")
async def root():
    return {"message": "Hello World"}