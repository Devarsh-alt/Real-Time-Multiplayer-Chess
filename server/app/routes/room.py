from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import RoomResponse
from app.crud import create_room
from app.schemas import RoomResponse, JoinRoomResponse
from app.crud import create_room, join_room
router = APIRouter()


@router.post(
    "/rooms",
    response_model=RoomResponse
)
def create_new_room(
    db: Session = Depends(get_db)
):
    return create_room(db)

@router.post(
    "/rooms/{room_code}/join",
    response_model=JoinRoomResponse
)
def join_existing_room(
    room_code: str,
    db: Session = Depends(get_db)
):
    return join_room(db, room_code)