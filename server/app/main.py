from fastapi import FastAPI

from .database import Base, engine

import app.models

from app.routes.room import router as room_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(room_router)


@app.get("/")
def home():
    return {
        "message": "Chess Backend Running"
    }