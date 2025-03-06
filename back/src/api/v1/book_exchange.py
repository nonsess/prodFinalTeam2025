from typing import Annotated, Sequence

from fastapi import APIRouter, Depends, HTTPException, Path, status

from src.auth.backend_jwt import current_active_user
from src.core.exceptions import NotFoundError
from src.db.manager import SessionDependency
from src.repositories.book_exchange import BookExchangeRepository
from src.schemas import UserRead
from src.schemas.book_exchange import BookExchange, BookExchangeCreate

router = APIRouter(prefix="/book-exchanges", tags=["Book-exchanges"])


@router.get("", summary="Get all book exchanges")
async def get_all_book_exchanges_handler(
    user: Annotated[UserRead, Depends(current_active_user)],
    session: SessionDependency,
) -> Sequence[BookExchange]:
    book_exchange = BookExchangeRepository(session)
    return await book_exchange.get_all_by_user_id(user_id=user.id)


@router.get("/{bookExchangeId}", summary="Get book exchange by id")
async def get_book_exchange_handler(
    book_exchange_id: Annotated[int, Path(alias="bookExchangeId")],
    user: Annotated[UserRead, Depends(current_active_user)],
    session: SessionDependency,
) -> BookExchange:
    book_exchange = BookExchangeRepository(session)
    try:
        result = await book_exchange.get(id=book_exchange_id)
    except NotFoundError as e:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="Book exchange not found",
        ) from e
    return result


@router.post("", response_model=BookExchange, summary="Create book exchange")
async def create_book_exchange_handler(
    book_exchange_create: BookExchangeCreate,
    user: Annotated[UserRead, Depends(current_active_user)],
    session: SessionDependency,
) -> BookExchange | None:
    book_exchange_repository = BookExchangeRepository(session)
    try:
        return await book_exchange_repository.create(
            user_to_id=user.id, **book_exchange_create.model_dump(),
        )
    except NotFoundError as e:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail=str(e),
        ) from e


@router.delete("/{bookExchangeId}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete book exchange")
async def delete_book_exchange_handler(
    book_exchange_id: Annotated[int, Path(alias="bookExchangeId")],
    user: Annotated[UserRead, Depends(current_active_user)],
    session: SessionDependency,
) -> None:
    book_exchange_repository = BookExchangeRepository(session)
    try:
        await book_exchange_repository.delete(id=book_exchange_id)
    except NotFoundError as e:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            detail="Book exchange not found",
        ) from e
