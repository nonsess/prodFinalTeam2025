from pydantic import BaseModel, Field

from src.schemas.book_offer import BookOffer
from src.schemas.user import UserRead


class BaseBookExchange(BaseModel):
    pass


class BookExchange(BaseBookExchange):
    book_offer: BookOffer = Field(description="Book offer id")
    user_from: UserRead = Field(description="Exchanger")
    user_to: UserRead = Field(description="Customer")


class BookExchangeCreate(BaseBookExchange):
    book_id: int = Field(description="Book offer id")
    user_from_id: int = Field(description="Exchanger id", gt=0)
