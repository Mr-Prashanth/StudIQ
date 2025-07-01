from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.langchain_chat import chat_runnable

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    # session_id: str


class ChatResponse(BaseModel):
    response: str

#prefix with /api
@router.post("/chat", response_model=ChatResponse) # endpoint /api/chat
async def chat_with_bot(request: ChatRequest):
    try:
        result = chat_runnable.invoke(
            {"messages": request.message}, config={"configurable": {"session_id": "1"}}
        )
        return ChatResponse(response=result.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
