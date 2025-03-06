from collections.abc import Sequence
from typing import Any

from sqlalchemy import or_, select, update
from sqlalchemy.orm import joinedload

from src.models import BookOffer
from src.core.exceptions import NotFoundError
from src.models.book_exchange import BookExchange
from src.repositories.base import BaseDBRepositoryWithModel
from src.repositories.book_offer import BookRepository
from src.repositories.user import UserRepository


class BookExchangeRepository(BaseDBRepositoryWithModel[BookExchange]):
    model = BookExchange

    async def create(self, **fields: Any) -> BookExchange:
        user_repo = UserRepository(self.session)
        if not await user_repo.get(id=fields.get("user_from_id")):
            msg = "Exchanger not found"
            raise NotFoundError(msg)
        if not await user_repo.get(id=fields.get("user_to_id")):
            msg = "Customer not found"
            raise NotFoundError(msg)
        book_repo = BookRepository(self.session)
        if not await book_repo.get(id=fields.get("book_id")):
            msg = "Book not found"
            raise NotFoundError(msg)
        book_exchange_obj = BookExchange(**fields)
        self.session.add(book_exchange_obj)
        await self.session.commit()
        return await self.get(id=book_exchange_obj.id)

    async def update(self, book_exchange_id: int, **fields: Any) -> BookExchange:
        query = await self.session.scalars(
            update(BookExchange)
            .where(BookExchange.id == book_exchange_id)
            .values(**fields)
            .returning(BookExchange),
        )
        await self.session.commit()
        return query.first()

    async def get(self, **filters: Any) -> BookExchange:
        query = await self.session.scalars(
            select(BookExchange)
            .options(
                joinedload(BookExchange.book_offer).joinedload(BookOffer.main_photo),
                joinedload(BookExchange.book_offer).joinedload(BookOffer.point),
                joinedload(BookExchange.user_to),
                joinedload(BookExchange.user_from),
            )
            .filter_by(**filters)
        )
        book_exchange = query.first()
        if not book_exchange:
            raise NotFoundError
        return book_exchange

    async def get_all_by_user_id(
        self, user_id: int, limit: int | None = None, offset: int | None = None,
    ) -> Sequence[BookExchange]:
        result = await self.session.scalars(
            select(BookExchange)
            .options(
                joinedload(BookExchange.book_offer).joinedload(BookOffer.main_photo),
                joinedload(BookExchange.book_offer).joinedload(BookOffer.point),
                joinedload(BookExchange.user_to),
                joinedload(BookExchange.user_from),
            )
            .where(
                or_(
                    BookExchange.user_from_id == user_id,
                    BookExchange.user_to_id == user_id,
                )
            )
            .limit(limit)
            .offset(offset)
        )
        return result.all()
