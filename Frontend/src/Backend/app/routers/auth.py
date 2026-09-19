from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.auth.security import hash_password, verify_password, create_access_token
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, UserLogin, Token


router = APIRouter()

# Registration Endpoint

@router.post("/register", response_model=UserResponse)
def register(
    request: UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(
            or_(
                User.email == request.email,
                User.username == request.username
            )
        )
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User with this email or username already exists"
        )

    hashed_password = hash_password(request.password)

    new_user = User(
        username=request.username,
        email=request.email,
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

# Login Endpoint

@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = (
        db.query(User)
        .filter(
            or_(
                User.email == form_data.username,
                User.username == form_data.username
            )
        )
        .first()
    )

    if not user or not verify_password(form_data.password, user.hashed_password): 
        raise HTTPException(
            status_code=401,
            detail="Invalid email/username or password"
        )

    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}
