"""add_cross_workspace_fields_to_chats

Revision ID: bf6392b4544c
Revises: 35
Create Date: 2025-10-26 01:19:44.234388

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bf6392b4544c'
down_revision: Union[str, None] = '35'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add cross-workspace support fields to chats table
    op.add_column('chats', sa.Column('document_workspace_map', sa.JSON(), nullable=True))
    op.add_column('chats', sa.Column('connector_workspace_map', sa.JSON(), nullable=True))
    op.add_column('chats', sa.Column('selected_workspace_ids', sa.ARRAY(sa.Integer()), nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    # Remove cross-workspace support fields from chats table
    op.drop_column('chats', 'selected_workspace_ids')
    op.drop_column('chats', 'connector_workspace_map')
    op.drop_column('chats', 'document_workspace_map')
