"""empty message

Revision ID: 5758641627d2
Revises: 3f0ef1ef2c5a
Create Date: 2025-03-03 20:47:08.673311

"""

from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "5758641627d2"
down_revision: str | None = "dedee8ce82ce"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "admin_tokens",
        sa.Column("admin_id", sa.Integer(), nullable=False),
        sa.Column("token", sa.String(), nullable=False),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=True,
        ),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(
            ["admin_id"],
            ["user.id"],
            name=op.f("fk_admin_tokens_admin_id_user"),
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_admin_tokens")),
        sa.UniqueConstraint("id", name=op.f("uq_admin_tokens_id")),
    )


def downgrade() -> None:
    op.drop_table("admin_tokens")
