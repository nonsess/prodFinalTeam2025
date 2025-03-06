"""merge branches

Revision ID: 3f0ef1ef2c5a
Revises: e051d91926be, 35894d222fa0
Create Date: 2025-03-03 14:11:10.431682

"""

from collections.abc import Sequence

# revision identifiers, used by Alembic.
revision: str = "3f0ef1ef2c5a"
down_revision: str | None = ("e051d91926be", "35894d222fa0")
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
