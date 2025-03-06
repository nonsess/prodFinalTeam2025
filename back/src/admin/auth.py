from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request
from starlette.responses import Response

from src.auth.password import password_helper
from src.db.manager import database_manager
from src.repositories.admin_token import AdminTokenRepository
from src.repositories.user import UserRepository


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        username, password = form.get("username"), form.get("password")
        async with database_manager.session_factory() as session:
            admin = await UserRepository(session).get(email=username)
            if (
                    admin is None
                    or not admin.is_superuser
                    or not password_helper.verify_and_update(password, admin.hashed_password)
            ):
                return False
            token = password_helper.generate()
            await AdminTokenRepository(session).create(admin.id, token)
        request.session.update({"token": token})
        return True

    async def logout(self, request: Request) -> bool:
        async with database_manager.session_factory() as session:
            await AdminTokenRepository(session).delete(token=request.session.get("token"))
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> Response | bool:
        token = request.session.get("token")
        async with database_manager.session_factory() as session:
            is_valid = await AdminTokenRepository(session).get(token=token)
            return bool(is_valid)


auth_backend = AdminAuth(secret_key="...")
