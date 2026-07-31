from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from .database import Base


class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)

    room_code = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )

    status = Column(
        String,
        default="WAITING"
    )

    current_fen = Column(
        String,
        nullable=False
    )

    winner = Column(
        String,
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    started_at = Column(
        DateTime(timezone=True),
        nullable=True
    )

    ended_at = Column(
        DateTime(timezone=True),
        nullable=True
    )