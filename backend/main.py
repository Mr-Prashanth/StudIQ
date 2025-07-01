from fastapi import FastAPI
from routes import chat
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="College AI Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific frontend domain in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(chat.router, prefix="/api")
