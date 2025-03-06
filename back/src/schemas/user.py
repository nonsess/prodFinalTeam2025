from fastapi_users import schemas
from pydantic import Field

from src.utils.partial_schema import partial_schema


class UserMixin:
    name: str = Field(description="User name")
    number: str = Field(description="User phone number")
    contact: str = Field(description="User contact")


class UserRead(UserMixin, schemas.BaseUser[int]):
    pass


class UserCreate(UserMixin, schemas.BaseUserCreate):
    pass


@partial_schema
class UserUpdate(UserMixin,schemas.BaseUserUpdate):
    pass
