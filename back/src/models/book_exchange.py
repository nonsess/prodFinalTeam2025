import datetime as dt
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models.base import Base

if TYPE_CHECKING:
    from src.models.book_offer import BookOffer
    from src.models.user import User


class BookExchange(Base):
    __tablename__ = "book_exchanges"

    user_from_id: Mapped[int] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"))
    user_to_id: Mapped[int] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"))
    book_id: Mapped[int] = mapped_column(ForeignKey("book_offers.id", ondelete="CASCADE"))

    book_offer: Mapped["BookOffer"] = relationship(back_populates="book_exchanges")
    user_to: Mapped["User"] = relationship(
        back_populates="user_customer",
        primaryjoin="BookExchange.user_to_id == User.id",
    )
    user_from: Mapped["User"] = relationship(
        back_populates="user_exchanger",
        primaryjoin="BookExchange.user_from_id == User.id",
    )
