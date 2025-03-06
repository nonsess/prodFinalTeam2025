"""empty message

Revision ID: 35894d222fa0
Revises: 19cc4d319920
Create Date: 2025-03-03 10:37:59.115353

"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "35894d222fa0"
down_revision: str | None = "19cc4d319920"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "book_exchanges",
        sa.Column("user_from_id", sa.Integer(), nullable=False),
        sa.Column("user_to_id", sa.Integer(), nullable=False),
        sa.Column("book_id", sa.Integer(), nullable=False),
        sa.Column("exchange_date", sa.DateTime(), nullable=True),
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=True,
        ),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(
            ["book_id"],
            ["book_offers.id"],
            name=op.f("fk_book_exchanges_book_id_book_offers"),
        ),
        sa.ForeignKeyConstraint(
            ["user_from_id"],
            ["user.id"],
            name=op.f("fk_book_exchanges_user_from_id_user"),
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["user_to_id"],
            ["user.id"],
            name=op.f("fk_book_exchanges_user_to_id_user"),
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_book_exchanges")),
        sa.UniqueConstraint("id", name=op.f("uq_book_exchanges_id")),
    )
    op.add_column("book_offers", sa.Column("creator_id", sa.Integer(), nullable=False))
    op.create_foreign_key(
        op.f("fk_book_offers_creator_id_user"),
        "book_offers",
        "user",
        ["creator_id"],
        ["id"],
        ondelete="CASCADE",
    )


def downgrade() -> None:
    op.drop_constraint(
        op.f("fk_book_offers_creator_id_user"), "book_offers", type_="foreignkey"
    )
    op.drop_column("book_offers", "creator_id")
    op.drop_table("book_exchanges")
