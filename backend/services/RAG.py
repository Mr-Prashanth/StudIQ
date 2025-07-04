import os
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from dotenv import load_dotenv

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")
# Choose a lightweight embedding model
embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")


VECTORSTORE_DIR = "vectorstore"
llm = ChatGroq(api_key=groq_api_key, model_name="llama3-8b-8192")


class RAGService:
    VECTORSTORE_DIR = "vectorstore"
    llm = ChatGroq(api_key=groq_api_key, model_name="llama3-8b-8192")

    @staticmethod
    def ingest_pdf_to_faiss(file_path: str, course_id: str):
        # Load and split PDF
        loader = PyPDFLoader(file_path)
        documents = loader.load()

        splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        chunks = splitter.split_documents(documents)

        # Create vectorstore
        if os.path.exists(f"{VECTORSTORE_DIR}/{course_id}"):
            db = FAISS.load_local(
                f"{VECTORSTORE_DIR}/{course_id}",
                embedding_model,
                allow_dangerous_deserialization=True,
            )
            db.add_documents(chunks)
        else:
            db = FAISS.from_documents(chunks, embedding_model)

        db.save_local(f"{VECTORSTORE_DIR}/{course_id}")
        return "successfully created vectorstore for course_id: " + course_id

    @staticmethod
    def get_context(query: str, course_id: str, k: int = 5):
        # Load vectorstore
        try:
            db = FAISS.load_local(
                f"{RAGService.VECTORSTORE_DIR}/{course_id}",
                embedding_model,
                allow_dangerous_deserialization=True,
            )
        except FileNotFoundError:
            raise FileNotFoundError(
                f"Vectorstore for course_id '{course_id}' not found. Please ingest the PDF first."
            )
        # Create a retriever
        retriever = db.as_retriever(search_kwargs={"k": k})

        # Create a QA chain
        from langchain.chains import RetrievalQA

        qa_chain = RetrievalQA.from_chain_type(
            llm=llm, retriever=retriever, chain_type="stuff"
        )

        # Get result from the chain
        context = qa_chain.invoke(query)
        return context["result"]


