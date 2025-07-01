// App.js
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { AppContext } from "./contexts/AppContexts";
import Home from "./pages/Home";
import Main from "./pages/Main";
import { useContext } from "react";
import Login from "./components/Login";
import { Route, Routes } from "react-router";
import Chat from "./pages/Chat";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Dashboard from "./pages/Dashboard";

function App() {
  const { showLogin } = useContext(AppContext);
  return (
    <div className="App">
      <Navbar />
      <ToastContainer position="bottom-right" />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
      </Routes>
    </div>
  );
}

export default App;
