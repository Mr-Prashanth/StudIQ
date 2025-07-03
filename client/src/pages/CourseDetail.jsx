import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';
import axios from 'axios';

const tabs = ['General', 'Announcements', 'Lecture Slides'];

const CourseDetail = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('General');
  const [courseInfo, setCourseInfo] = useState({});
  const [materials, setMaterials] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [doneSlides, setDoneSlides] = useState({});

  const toggleDone = (id) => {
    setDoneSlides(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, materialRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/course/${courseId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get(`http://localhost:5000/api/lecture/${courseId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
        ]);

        setCourseInfo(courseRes.data.course || {});
        setMaterials(materialRes.data.materials || []);
        setAnnouncements(courseRes.data.announcements || []);
      } catch (err) {
        console.error("Error fetching course details:", err);
      }
    };

    fetchData();
  }, [courseId]);

  const renderTabContent = () => {
    if (activeTab === 'General') {
      return (
        <div>
          <p className="text-gray-700 leading-relaxed">{courseInfo.description || 'No description provided.'}</p>
        </div>
      );
    }

    if (activeTab === 'Announcements') {
      return (
        <ul className="list-disc list-inside space-y-2">
          {announcements.length > 0 ? announcements.map((a, i) => (
            <li key={i}>{a}</li>
          )) : <p>No announcements yet.</p>}
        </ul>
      );
    }

    if (activeTab === 'Lecture Slides') {
      return (
        <div className="space-y-4">
          {materials.length > 0 ? materials.map((slide) => (
            <div key={slide.material_id} className="flex items-center justify-between p-4 border rounded-xl bg-white shadow">
              <div>
                <h4 className="text-lg font-semibold">{slide.title}</h4>
                <p className="text-sm text-gray-500">{slide.description}</p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`http://localhost:5000${slide.file_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View
                </a>
                <button
                  className={`text-sm px-3 py-1 rounded-full ${doneSlides[slide.material_id] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                  onClick={() => toggleDone(slide.material_id)}
                >
                  {doneSlides[slide.material_id] ? '✅ Done' : 'Mark as Done'}
                </button>
              </div>
            </div>
          )) : <p>No materials uploaded yet.</p>}
        </div>
      );
    }
  };

  return (
    <div className="bg-white min-h-screen pt-[120px] px-6 text-black ml-40 mr-40">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-indigo-600 capitalize tracking-tight">
            {courseInfo.course_name || 'Loading...'}
          </h2>
          <p className="text-md text-gray-500 mt-1">Department: <span className="font-medium">{courseInfo.department}</span></p>
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

      {/* Content */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-inner border space-y-6">
        {renderTabContent()}

        {['Lecture Slides', 'General'].includes(activeTab) && (
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
