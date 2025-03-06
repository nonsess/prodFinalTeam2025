from fastapi_users.db import SQLAlchemyBaseUserTable
from sqlalchemy.orm import Mapped, relationship
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from src.models.base import Base
from src.models.book_exchange import BookExchange
from src.models.book_offer import BookOffer


class User(SQLAlchemyBaseUserTable[int], Base):  # type: ignore[misc]
    user_exchanger: Mapped[list["BookExchange"]] = relationship(
        back_populates="user_from",
        foreign_keys=[BookExchange.user_from_id],
    )
    user_customer: Mapped[list["BookExchange"]] = relationship(
        back_populates="user_to",
        foreign_keys=[BookExchange.user_to_id],
    )
    book_offers: Mapped["BookOffer"] = relationship(back_populates="creator")

    name: Mapped[str] = mapped_column(String(150))
    number: Mapped[str] = mapped_column(String(150))
    contact: Mapped[str] = mapped_column(String(150))

    def __str__(self):
        return self.email
