from fastapi import FastAPI
from sqladmin import Admin

from src.admin.auth import auth_backend
from src.admin.views import BookOfferView, PointView, UserView
from src.db.manager import database_manager


def get_admin(app: FastAPI) -> Admin:
    admin = Admin(
        app,
        engine=database_manager.engine,
        session_maker=database_manager.session_factory,
        authentication_backend=auth_backend,
    )
    admin.add_view(BookOfferView)
    admin.add_view(PointView)
    admin.add_view(UserView)
    return admin

