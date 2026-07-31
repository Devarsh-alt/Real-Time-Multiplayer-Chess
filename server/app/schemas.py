from pydantic import BaseModel


class RoomResponse(BaseModel):
    room_code: str
    status: str

    class Config:
        from_attributes = True



class JoinRoomResponse(BaseModel):
    message: str
    room_code: str
    status: str