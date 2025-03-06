from fastapi import APIRouter, HTTPException

from src.auth.backend_jwt import fastapi_users
from src.schemas.user import UserRead, UserUpdate
from src.db.manager import SessionDependency
from src.models.user import User

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/get_user/{user_id}", response_model=UserRead)
async def get_user_by_id(user_id: int, session: SessionDependency):
    user = await session.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    user_dict = {
        "id": user.id,
        "email": user.email,
        "is_active": user.is_active,
        "is_superuser": user.is_superuser,
        "is_verified": user.is_verified,
        "name": user.name,
        "number": user.number,
        "contact": user.contact,
    }
    user_read = UserRead(**user_dict)

    return user_read

router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate, requires_verification=False),
)

