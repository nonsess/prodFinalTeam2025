from src.models.admin_token import AdminToken
from src.repositories.base import BaseDBRepositoryWithModel



class AdminTokenRepository(BaseDBRepositoryWithModel[AdminToken]):
    model = AdminToken

    async def create(self, admin_id: int, token: str) -> AdminToken:
        result = AdminToken(admin_id=admin_id, token=token)
        self.session.add(result)
        await self.session.commit()
        return result
