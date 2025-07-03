// pages/LectureSlides.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostAnnouncement from '../components/PostAnnouncement';

const LectureSlides = () => {
  const { courseId } = useParams();
  const [form, setForm] = useState({
    title: '',
    description: '',
    file: null,
  });
  const [materials, setMaterials] = useState([]);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/lecture/${courseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMaterials(res.data.materials || []);
    } catch (err) {
      console.error('Error fetching materials:', err);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [courseId]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('course_id', courseId);
    formData.append('file', form.file);

    try {
      await axios.post('http://localhost:5000/api/lecture/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setForm({ title: '', description: '', file: null });
      fetchMaterials();
      alert("✅ Uploaded successfully");
    } catch (err) {
      console.error('Upload error:', err);
      alert("❌ Upload failed");
    }
  };

  return (
    <div className="mt-36 mx-10 lg:mx-40 mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">📚 Course Dashboard</h2>

      {/* Upload Lecture Material */}
      <form onSubmit={handleFileUpload} className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-blue-200 mb-10">
        <h3 className="text-xl font-semibold mb-4">📤 Upload Lecture Material</h3>
        <input
          type="text"
          placeholder="Lecture Title"
          className="w-full px-4 py-2 border rounded-lg"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full px-4 py-2 border rounded-lg"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="file"
          accept=".pdf,.ppt,.pptx,.doc,.docx"
          className="w-full"
          onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </form>

      {/* 📂 Uploaded Materials */}
      <div className="mt-10 mb-16">
        <h3 className="text-xl font-semibold mb-4">📂 Uploaded Materials</h3>
        {materials.length === 0 ? (
          <p className="text-gray-500">No materials uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {materials.map((m) => (
              <li key={m.material_id} className="bg-white p-4 rounded-lg shadow-sm border">
                <h4 className="font-bold text-blue-800">{m.title}</h4>
                <p className="text-gray-600 text-sm">{m.description}</p>
                <a
                  href={`http://localhost:5000${m.file_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  📥 Download ({m.file_type?.split('/')[1] || m.file_type})
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 📣 Post Announcement */}
      <div id="announcement">
  <PostAnnouncement courseId={courseId} />
</div>
    </div>
  );
};

export default LectureSlides;
