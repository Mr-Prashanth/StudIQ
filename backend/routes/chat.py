from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.langchain_chat import chat_runnable
from services.RAG import RAGService

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    course_id: str
    # session_id: str


class ChatResponse(BaseModel):
    response: str


class uploadedFile(BaseModel):
    path: str
    course_id: str


@router.post("/upload", response_model=str)
async def create_vectorstore(request: uploadedFile):
    try:
        return RAGService.ingest_pdf_to_faiss(request.path, request.course_id)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/chat", response_model=ChatResponse)
async def chat_with_bot(request: ChatRequest):
    try:
        query = request.message
        context = RAGService.get_context(query, request.course_id)
        merged_message = f"<context>{context}</context> \n <query>{query}</query>"
        result = chat_runnable.invoke(
            {"messages": merged_message}, config={"configurable": {"session_id": "1"}}
        ) 
        return ChatResponse(response=result.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
