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

# Prompt Template
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are Martha, a helpful AI assistant for college students."),
        MessagesPlaceholder(variable_name="history"),
        ("human", "{messages}"),
    ]
)

# Combine prompt & LLM
chain = prompt | llm


# Redis history function
def get_message_history(session_id: str):
    return RedisChatMessageHistory(session_id=session_id, url=redis_url)


# Final Runnable chain with memory
chat_runnable = RunnableWithMessageHistory(
    chain,
    get_message_history,
    input_messages_key="messages",
    history_messages_key="history",
)
