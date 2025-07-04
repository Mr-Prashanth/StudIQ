import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnableWithMessageHistory
from langchain_community.chat_message_histories import RedisChatMessageHistory
from dotenv import load_dotenv

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")
redis_url = os.getenv("REDIS_URL")

# LLM
llm = ChatGroq(api_key=groq_api_key, model_name="llama3-8b-8192")

system_message = """You are a helpful interactive AI assistant for college students. 
if you receive context from the course materials and your job is to answer academic doubts based strictly on that context. 
Use clear and simple language suitable for students. if provided the context just be a normal assiatant provide the result in a well structured markdowns."""

# Prompt Template
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_message),
        MessagesPlaceholder(variable_name="history"),
        ("human", "{messages}"),
    ]
)

# Combine prompt & LLM
chain = prompt | llm


def delete_chat_session(session_id: str):
    """Delete a specific chat session from Redis."""
    history = RedisChatMessageHistory(session_id=session_id, url=redis_url)
    history.clear()
    print(f"Chat session '{session_id}' deleted.")


# Redis history function
def get_message_history(session_id: str):
    return RedisChatMessageHistory(session_id=session_id, url=redis_url)


# Final Runnable chain with memory
chat_runnable = RunnableWithMessageHistory(
    chain,
    get_message_history,
    input_messages_key="messages",
    history_messages_key="history",
    session_id_key="session_id",
)

