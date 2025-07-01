import React from 'react';
import { FaRobot, FaChartLine, FaUserFriends, FaBookOpen, FaChalkboardTeacher, FaLaptopCode } from 'react-icons/fa';
import { MdQuiz } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";

const features = [
  {
    icon: <FaRobot className="text-3xl text-[#1d4ed8]" />,
    title: "AI-Powered Notes",
    desc: "Automatically summarized notes based on your syllabus and lectures.",
  },
  {
    icon: <FaChartLine className="text-3xl text-[#1d4ed8]" />,
    title: "Progress Tracking",
    desc: "Visualize your growth with smart performance analytics.",
  },
  {
    icon: <MdQuiz className="text-3xl text-[#1d4ed8]" />,
    title: "Interactive Quizzes",
    desc: "Auto-generated quizzes to test your knowledge in real-time.",
  },
  {
    icon: <FaUserFriends className="text-3xl text-[#1d4ed8]" />,
    title: "Study Groups",
    desc: "Join real-time collaborative rooms with your friends and batchmates.",
  },
  {
    icon: <FaBookOpen className="text-3xl text-[#1d4ed8]" />,
    title: "Sharper Answers",
    desc: "Ask anything — get sharp, AI-generated explanations instantly.",
  },
  {
    icon: <FaLaptopCode className="text-3xl text-[#1d4ed8]" />,
    title: "Personalized Learning",
    desc: "Content tailored to your interests, skills, and learning goals.",
  },
  {
    icon: <FaChalkboardTeacher className="text-3xl text-[#1d4ed8]" />,
    title: "Teacher Dashboard",
    desc: "Teachers can upload notes, manage quizzes, and post announcements.",
  },
  {
    icon: <PiStudentBold className="text-3xl text-[#1d4ed8]" />,
    title: "Student Profiles",
    desc: "Each student gets their own dashboard with performance overview.",
  },
];

const Features = () => {
  return (
    <div className="bg-[#fefce8] py-16 text-[#0f172a]">
      <div className="ml-40 mr-40">
        <h2 className="text-4xl font-bold text-center mb-12 font-roboto">What Makes <span className="text-[#1d4ed8]">STUDIQ</span> Special?</h2>
        
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
