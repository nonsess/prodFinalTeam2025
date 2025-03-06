from collections.abc import Sequence
from typing import Any

from sqlalchemy import func, select, update
from sqlalchemy.orm import joinedload

from src.core.exceptions import NotFoundError
from src.models import BookOffer
from src.repositories.base import BaseDBRepositoryWithModel


class BookRepository(BaseDBRepositoryWithModel[BookOffer]):
    model = BookOffer

    async def get(self, **filters: Any) -> Any:
        query = await self.session.scalars(
            select(BookOffer)
            .filter_by(**filters)
            .options(joinedload(BookOffer.main_photo))
            .options(joinedload(BookOffer.point))
        )
        book_offer = query.first()
        if not book_offer:
            raise NotFoundError

        book_offer.main_photo_url = (
            book_offer.main_photo.url if book_offer.main_photo else None
        )

        return book_offer

    async def get_all(
            self,
            limit: int | None = None,
            offset: int | None = None,
            **filters: Any,
    ) -> tuple[int, Sequence[Any]]:

        stmt = (
            select(BookOffer)
            .filter_by(**filters)
            .options(joinedload(BookOffer.point), joinedload(BookOffer.main_photo))
            .limit(limit)
            .offset(offset)
        )
        result = await self.session.scalars(stmt)
        total_count = await self.session.scalar(
            select(func.count(BookOffer.id)).filter_by(**filters)
        )

        return total_count, result.all()

    async def create(self, **fields: Any) -> BookOffer:
        book = BookOffer(**fields)
        self.session.add(book)
        await self.session.commit()
        return await self.get(id=book.id)

    async def update(self, book_id: int, **fields: Any) -> BookOffer:
        query = await self.session.scalars(
            update(BookOffer)
            .where(BookOffer.id == book_id)
            .values(**fields)
            .returning(BookOffer),
        )
        result = query.first()
        if not result:
            raise NotFoundError
        return await self.get(id=result.id)
