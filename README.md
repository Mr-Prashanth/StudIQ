# StudIQ: AI-Powered Learning Management System

## Overview
StudIQ is a modern Learning Management System (LMS) designed to bridge the gap between traditional note-sharing and AI-driven learning. While students often use tools like ChatGPT to learn, they lack proper context from their course materials. StudIQ solves this by integrating Retrieval-Augmented Generation (RAG) pipelines, providing students with contextual, course-specific answers powered by state-of-the-art AI.

## Key Features
- **AI-Powered Contextual Chat:** Students can chat with an AI assistant that leverages their course notes for highly relevant answers.
- **RAG Pipeline:** Uses Retrieval-Augmented Generation to fetch context from uploaded notes and feed it to the LLM.
- **LangChain Integration:** The backend pipeline is built using the LangChain framework for flexible, modular AI workflows.
- **Course Material Management:** Teachers can upload notes (PDFs), which are vectorized and indexed for retrieval.
- **Interactive Quizzes & Analytics:** Auto-generated quizzes and performance tracking (see client features).
- **Role-Based Access:** Separate dashboards and features for students, teachers, and admins.
- **Google OAuth:** Easy login with Google for students and teachers.

## AI & Backend Tech Stack
- **Python (FastAPI):** Main backend for AI and chat endpoints.
- **LangChain:** Framework for building RAG pipelines and LLM chains.
- **FAISS:** Vector database for efficient similarity search over course materials.
- **HuggingFace Embeddings:** For document and query vectorization.
- **LLM (Groq Llama3):** Large Language Model used for generating answers (via `langchain_groq`).
- **Redis:** For chat session and message history.
- **PyPDFLoader:** For extracting text from uploaded PDFs.
- **Node.js (Express):** REST API for user, course, and material management.
- **Sequelize & PostgreSQL:** Relational database for user, course, and material data.

## Frontend Tech Stack
- **React:** Modern SPA for students, teachers, and admins.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Axios:** For API requests.
- **React Router:** Client-side routing.
- **React Toastify:** User notifications.
- **Recharts:** Data visualization for analytics.

## Project Structure
```
StudIQ/
  backend/    # FastAPI (AI, RAG, chat) + Node.js (REST API)
  client/     # React frontend
```

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- Python (v3.10+ recommended)
- PostgreSQL database

### 1. Backend Setup
#### a. Node.js REST API
```bash
cd backend
npm install
# Configure your .env file for DB and JWT secrets
npm run dev
```
#### b. Python AI Service (FastAPI)
```bash
# In another terminal
cd backend
pip install uv
uv sync # use pyproject.toml 
uvicorn main:app --reload --port 8000
```
- Set up environment variables for Groq API, Redis, etc. (see `.env` examples)

### 2. Frontend Setup
```bash
cd client
npm install
npm start
```

### 3. Database Setup
- Create a PostgreSQL database and update credentials in `backend/config/db.js` and your `.env` file.
- Sequelize will auto-create tables on first run.

### 4. Google OAuth Setup
- Configure Google OAuth credentials and callback URL in your `.env` file.
- See `backend/views/google/sendToken.html` for the OAuth token exchange page.

## Usage
- Teachers upload course notes (PDFs) via the dashboard.
- Notes are vectorized and indexed for retrieval.
- Students can chat with the AI assistant, which uses RAG to answer based on course context.
- Admins manage users, courses, and announcements.

## Contributors

- **[Gokul Nishandh S T](https://github.com/Gokul-Nishandh)**  
  - Developed the entire frontend (React, Tailwind CSS, UI/UX)
  - Built the LMS backend (Node.js, Express, Sequelize, PostgreSQL)
  - Implemented user authentication, course management, and file uploads

- **[Prashanth Samkumar](https://github.com/Mr-Prashanth)**  
  - Integrated AI features (RAG pipeline, LangChain, Groq Llama3)
  - Used Hugging Face pretrained model (all-MiniLM-L6-v2) for embeddings
  - Developed the FastAPI backend for chat and context retrieval
  - Set up Redis for chat history and session management
  - Implemented PDF vectorization and context-aware chat

## How to Start All Servers

You need to run three servers for full functionality:

1. **Node.js Backend (REST API)**
   - Handles user authentication, course management, file uploads, etc.
   - **Default port:** `5000`
   - **Start command:**
     ```bash
     cd backend
     npm run dev
     ```

2. **Python FastAPI AI Backend (RAG, Chat, AI)**
   - Handles AI chat, RAG pipeline, and vector store operations.
   - **Default port:** `8000`
   - **Start command:**
     ```bash
     cd backend
     uvicorn main:app --reload --port 8000
     ```

3. **React Frontend**
   - User interface for students, teachers, and admins.
   - **Default port:** `3000`
   - **Start command:**
     ```bash
     cd client
     npm start
     ```

**Tip:**
- Open three separate terminal windows/tabs, one for each server.
- Make sure your environment variables and database are configured before starting.
- The frontend is set up to proxy API requests to the backend servers.

## Environment Variables (.env)

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Node.js Backend (Express, Sequelize)
PORT=5000
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/users/google/callback

# Python FastAPI AI Backend
GROQ_API_KEY=your_groq_api_key
REDIS_URL=redis://localhost:6379/0
```

**Descriptions:**
- `PORT`: Port for Node.js backend (default: 5000)
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`: PostgreSQL database credentials
- `JWT_SECRET`: Secret for signing JWT tokens
- `SESSION_SECRET`: Secret for Express session (used by Passport/Google OAuth)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`: Google OAuth credentials
- `GROQ_API_KEY`: API key for Groq Llama3 LLM (used by LangChain)
- `REDIS_URL`: Redis connection string for chat history

> ⚠️ **Never commit your .env file or secrets to version control!**
