from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models.base import Base

if TYPE_CHECKING:
    from src.models.book_offer import BookOffer


class Point(Base):
    __tablename__ = "points"

    city: Mapped[str] = mapped_column(String(150))
    place: Mapped[str] = mapped_column(String(150))

    def __str__(self):
        return f"{self.city}, {self.place}"

    book_offers: Mapped[list["BookOffer"]] = relationship(back_populates="point")
