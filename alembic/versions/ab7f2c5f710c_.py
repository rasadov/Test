"""empty message

Revision ID: ab7f2c5f710c
Revises: 
Create Date: 2024-07-16 15:00:33.283608

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ab7f2c5f710c'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade():
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
        sa.Column('username', sa.String(length=20), nullable=False, unique=True),
        sa.Column('password', sa.String(length=60), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('surname', sa.String(length=100), nullable=False),
        sa.Column('phone', sa.String(length=20), nullable=False),
        sa.Column('role', sa.String(length=20), nullable=False, default='user')
    )
    op.create_table('ecarts',
        sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('bonus', sa.Integer(), nullable=False, default=5)
    )

def downgrade():
    op.drop_table('ecarts')
    op.drop_table('users')