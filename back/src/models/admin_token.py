from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.models.base import Base


class AdminToken(Base):
    __tablename__ = "admin_tokens"

    admin_id: Mapped[int] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"))
    token: Mapped[str]
