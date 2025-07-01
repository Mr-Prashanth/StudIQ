import { useEffect, useState } from 'react';
import { FaUserGraduate, FaChartBar, FaBook } from 'react-icons/fa';

const Dashboard = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch('http://localhost:5000/api/users/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUserName(data.user.name);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="ml-40 mr-40 pt-28 mt-8 mb-8">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
      
      {/* User Name */}
      <h3 className="text-xl text-gray-600 mb-8">
        Welcome back, <span className="font-semibold">{userName || 'User'}!</span>
      </h3>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">Total Courses</h3>
            <FaUserGraduate className="text-indigo-600 text-xl" />
          </div>
          <p className="text-3xl font-bold text-indigo-600 mt-2">5</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">Pending Assignments</h3>
            <FaBook className="text-red-500 text-xl" />
          </div>
          <p className="text-3xl font-bold text-red-500 mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">Performance</h3>
            <FaChartBar className="text-green-500 text-xl" />
          </div>
          <p className="text-3xl font-bold text-green-500 mt-2">87%</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-3 text-gray-700">
            <li>✅ Completed "AI Lab Assignment 4"</li>
            <li>📌 Uploaded notes on "Linear Regression"</li>
            <li>📅 Joined "ML Workshop Week 2"</li>
            <li>📢 New announcement in "Data Structures"</li>
          </ul>
        </div>

        {/* Calendar Placeholder */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-4">Calendar</h3>
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 rounded-xl">
            [Calendar Component Here]
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
