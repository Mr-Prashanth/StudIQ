import React, { useEffect, useState } from 'react';

const MainHeader = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

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
    <div className="mb-6">
      <h1 className="text-2xl font-bold">
        Welcome back, {userName || 'User'} 👋
      </h1>
      <p className="text-sm text-gray-600">
        You’ve learned 70% of your goal this week. Keep it up and improve your progress.
      </p>
    </div>
  );
};

export default MainHeader;
