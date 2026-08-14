from fastapi import FastAPI
from app.database import Base, engine
import app.models.user
import app.models.task
from app.routers.auth import router as auth_router

app = FastAPI(title="Personal Task Manager API")

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["auth"])


@app.get("/")
async def root():
    return {"message": "Hello World"}