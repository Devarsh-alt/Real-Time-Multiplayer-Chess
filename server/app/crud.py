import random
import string
import chess

from sqlalchemy.orm import Session

from .models import Room
from fastapi import HTTPException

def generate_room_code(length=6):
    characters = string.ascii_uppercase + string.digits
    return "".join(random.choice(characters) for _ in range(length))


def create_room(db: Session):

    while True:
        room_code = generate_room_code()

        existing_room = (
            db.query(Room)
            .filter(Room.room_code == room_code)
            .first()
        )

        if not existing_room:
            break

    room = Room(
        room_code=room_code,
        current_fen=chess.Board().fen()
    )

    db.add(room)
    db.commit()
    db.refresh(room)

    return room
def join_room(db: Session, room_code: str):

    room = (
        db.query(Room)
        .filter(Room.room_code == room_code)
        .first()
    )

    if room is None:
        raise HTTPException(
            status_code=404,
            detail="Room not found"
        )

    if room.status != "WAITING":
        raise HTTPException(
            status_code=400,
            detail="Room is already full or unavailable"
        )

    room.status = "ACTIVE"

    db.commit()
    db.refresh(room)

    return {
        "message": "Joined successfully",
        "room_code": room.room_code,
        "status": room.status
    }