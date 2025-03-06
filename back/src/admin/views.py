from typing import ClassVar

from sqladmin import ModelView

from src.models.book_exchange import BookExchange
from src.models.book_offer import BookOffer
from src.models.point import Point
from src.models.user import User


class PointView(ModelView, model=Point):
    name_plural = "Points"
    column_list: ClassVar = [Point.city, Point.place, Point.created_at]
    column_searchable_list: ClassVar = [Point.city, Point.place]
    column_default_sort = (Point.created_at, True)
    column_formatters: ClassVar = {Point.place: lambda m, a: m.place[:15]}  # noqa: ARG005
    page_size = 20


class BookOfferView(ModelView, model=BookOffer):
    name = "Book offer"
    name_plural = "Book offers"
    column_list: ClassVar = [
        BookOffer.name,
        BookOffer.author,
        BookOffer.genre,
        BookOffer.point,
        BookOffer.creator,
        BookOffer.created_at,
    ]
    column_details_list: ClassVar = [
        BookOffer.name,
        BookOffer.author,
        BookOffer.genre,
        BookOffer.point,
        BookOffer.creator,
        BookOffer.binding,
        BookOffer.pages_count,
        BookOffer.size,
        BookOffer.condition,
        BookOffer.description,
        BookOffer.year,
        BookOffer.publisher,
        BookOffer.language,
        BookOffer.created_at,
        BookOffer.updated_at,
    ]
    column_searchable_list: ClassVar = [
        BookOffer.name,
        BookOffer.author,
        BookOffer.genre,
        BookOffer.point_id
    ]
    column_default_sort = (BookOffer.created_at, True)
    column_formatters: ClassVar = {BookOffer.name: lambda m, a: m.name[:15]}  # noqa: ARG005
    page_size = 20


class UserView(ModelView, model=User):
    column_list: ClassVar = [
        User.name,
        User.email,
        User.created_at,
        User.is_active,
        User.is_superuser,
        User.is_verified,
    ]
    column_details_list: ClassVar = [
        User.name,
        User.email,
        User.number,
        User.contact,
        User.is_active,
        User.is_superuser,
        User.is_verified,
        User.created_at,
        User.updated_at,
    ]
    page_size = 20
    column_default_sort = (User.created_at, True)


class BookExchangeView(ModelView, model=BookExchange):
    name = "Book exchange"
    name_plural = "Book exchanges"
    column_list: ClassVar = [
        BookExchange.book_offer,
        BookExchange.user_from,
        BookExchange.user_to,
        BookExchange.created_at,
    ]
    column_details_list: ClassVar = [
        BookExchange.book_offer,
        BookExchange.user_from,
        BookExchange.user_to,
        BookExchange.created_at,
        BookExchange.updated_at,
    ]
    can_edit = False
    column_default_sort = (BookExchange.created_at, True)
    page_size = 20
