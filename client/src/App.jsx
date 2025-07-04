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
import AdminPanel from "./pages/AdminPanel";
import TeacherPanel from "./pages/TeacherPanel";
import LectureSlides from "./pages/LectureSlides";
import MarkAttendancePage from "./pages/MarkAttendancePage";


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
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/chat" element={<Chat />} />

<Route path="/chat/:courseId" element={<Chat />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teacher" element={<TeacherPanel />} />
        <Route path="/teacher/:courseId" element={<LectureSlides />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/teacher/:courseId/mark-attendance" element={<MarkAttendancePage />} />
      </Routes>
    </div>
  );
}

export default App;
