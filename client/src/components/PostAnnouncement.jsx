// components/PostAnnouncement.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PostAnnouncement = ({ courseId, onPostSuccess }) => {
  const [announcement, setAnnouncement] = useState({
    title: '',
    message: '',
  });

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/announcement', {
        ...announcement,
        course_id: courseId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAnnouncement({ title: '', message: '' });
      onPostSuccess?.();
      alert("📢 Announcement posted!");
    } catch (err) {
      console.error('Error posting announcement:', err);
      alert('❌ Error posting announcement');
    }
  };

  return (
    <form onSubmit={handlePost} className="bg-white p-6 rounded-xl shadow-md mb-8 border-l-4 border-yellow-500">
      <h2 className="text-xl font-bold mb-4 text-yellow-700">📣 Post Announcement</h2>
      <input
        type="text"
        placeholder="Title"
        value={announcement.title}
        onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
        className="w-full mb-3 px-4 py-2 border rounded-lg text-sm"
        required
      />
      <textarea
        placeholder="Message"
        value={announcement.message}
        onChange={(e) => setAnnouncement({ ...announcement, message: e.target.value })}
        className="w-full mb-4 px-4 py-2 border rounded-lg text-sm"
        rows={4}
        required
      />
      <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg">
        📤 Post
      </button>
    </form>
  );
};

export default PostAnnouncement;
