import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const tabs = ['Announcements', 'Attendance', 'Lecture Slides'];

const CourseDetail = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('General');
  const [courseInfo, setCourseInfo] = useState({});
  const [materials, setMaterials] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [doneSlides, setDoneSlides] = useState({});
  const [attendance, setAttendance] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(null);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
const navigate = useNavigate();

  const toggleDone = (id) => {
    setDoneSlides(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const announcementRes = await axios.get(`http://localhost:5000/api/announcement/${courseId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
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
        setAnnouncements(announcementRes.data.announcements || []);
      } catch (err) {
        console.error("Error fetching course details:", err);
      }
    };

    fetchData();
  }, [courseId]);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (activeTab === 'Attendance') {
        setLoadingAttendance(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/attendance/${courseId}/student`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          setAttendance(response.data.attendance || []);
          
          // Calculate attendance percentage
          if (response.data.attendance && response.data.attendance.length > 0) {
            const presentCount = response.data.attendance.filter(
              record => record.status === 'present'
            ).length;
            const percentage = Math.round((presentCount / response.data.attendance.length) * 100);
            setAttendancePercentage(percentage);
          } else {
            setAttendancePercentage(0);
          }
        } catch (err) {
          console.error("Error fetching attendance:", err);
        } finally {
          setLoadingAttendance(false);
        }
      }
    };

    fetchAttendance();
  }, [activeTab, courseId]);

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
        <ul className="space-y-4">
          {announcements.length > 0 ? announcements.map((a, i) => (
            <li key={i} className="p-4 border rounded-xl bg-white shadow">
              <h4 className="text-lg font-bold text-indigo-700">{a.title}</h4>
              <p className="text-gray-700 mt-1">{a.message}</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted by {a.poster?.name || 'Unknown'} on {new Date(a.posted_at).toLocaleString()}
              </p>
            </li>
          )) : <p>No announcements yet.</p>}
        </ul>
      );
    }

    if (activeTab === 'Attendance') {
      return (
        <div className="space-y-6">
          {loadingAttendance ? (
            <p>Loading attendance data...</p>
          ) : (
            <>
              <div className="bg-white p-4 rounded-xl shadow border">
                <h3 className="text-lg font-semibold mb-2">Attendance Summary</h3>
                <div className="flex items-center">
                  <div className="w-24 h-24 rounded-full border-8 border-gray-200 flex items-center justify-center mr-4" 
                    style={{ 
                      background: `conic-gradient(#4f46e5 ${attendancePercentage * 3.6}deg, #e5e7eb 0deg)` 
                    }}>
                    <span className="text-xl font-bold">{attendancePercentage}%</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Total Classes:</span> {attendance.length}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Present:</span> {attendance.filter(a => a.status === 'present').length}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Absent:</span> {attendance.filter(a => a.status === 'absent').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow border">
                <h3 className="text-lg font-semibold mb-4">Attendance Details</h3>
                {attendance.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marked At</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {attendance.map((record, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(record.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                record.status === 'present' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {record.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(record.marked_at).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No attendance records found.</p>
                )}
              </div>
            </>
          )}
        </div>
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
<button
  className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700 text-lg"
  onClick={() => navigate(`/chat/${courseId}`)}
>
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