import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';
import General from '../components/General';
import Announcements from '../components/Announcements';
import LectureSlides from '../components/LectureSlides';
import Lectures from '../components/Lectures';
import Attendance from '../components/Attendance';

const tabs = ['General', 'Announcements', 'Lecture Slides', 'Lectures', 'Attendance'];

const dummyData = {
  professor: 'Dr. Shalini Sharma',
  general: 'This course covers advanced AI concepts including ML, NLP, and Deep Learning.',
  announcements: ['Class postponed on July 1', 'Assignment 2 due next Monday'],
  slides: ['Lecture 1 - Introduction.pdf', 'Lecture 2 - ML Basics.pdf'],
  lectures: ['Week 1 - AI Foundations', 'Week 2 - ML Models'],
  attendance: ['Week 1: Present', 'Week 2: Absent', 'Week 3: Present'],
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('General');
  const [doneSlides, setDoneSlides] = useState({});
  const [doneLectures, setDoneLectures] = useState({});

  const toggleDone = (type, id) => {
    if (type === 'slide') {
      setDoneSlides(prev => ({ ...prev, [id]: !prev[id] }));
    } else {
      setDoneLectures(prev => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'General':
        return <General description={dummyData.general} />;
      case 'Announcements':
        return <Announcements announcements={dummyData.announcements} />;
      case 'Lecture Slides':
        return (
          <LectureSlides
            slides={dummyData.slides}
            doneSlides={doneSlides}
            toggleDone={toggleDone}
          />
        );
      case 'Lectures':
        return (
          <Lectures
            lectures={dummyData.lectures}
            doneLectures={doneLectures}
            toggleDone={toggleDone}
          />
        );
      case 'Attendance':
        return <Attendance attendance={dummyData.attendance} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen pt-[120px] px-6 text-black ml-40 mr-40">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-indigo-600 capitalize tracking-tight">
            {courseId.replace(/-/g, ' ')}
          </h2>
          <p className="text-md text-gray-500 mt-1">Instructor: <span className="font-medium">{dummyData.professor}</span></p>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-xl shadow hover:bg-red-600 transition mt-2">
          🚀 Exam Mode
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap space-x-4 mb-6">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full border transition ${
              activeTab === tab
                ? 'bg-yellow-400 text-black font-semibold'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Box */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-inner border space-y-6">
        {renderTabContent()}

        {/* Learn with AI Button */}
        {['Lecture Slides', 'Lectures', 'General'].includes(activeTab) && (
          <div className="flex justify-center pt-4">
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700 text-lg">
              <FaRobot className="text-2xl" />
              Learn with AI
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
