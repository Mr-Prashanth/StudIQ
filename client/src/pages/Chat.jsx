import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoCopyOutline, IoShareSocialOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatEnded, setChatEnded] = useState(false);
  const [review, setReview] = useState('');
  const [courseName, setCourseName] = useState('');
  const [studentId, setStudentId] = useState(null); // 🆕
  const chatEndRef = useRef(null);
  const { courseId } = useParams();

  // Scroll chat to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting + fetch user and course
  useEffect(() => {
    const fetchUserAndCourse = async () => {
      try {
        const token = localStorage.getItem('token');

        const userRes = await fetch('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = await userRes.json();
        if (userRes.ok) {
          const userName = userData.user.name;
          console.log('User Data:', userData);
          setStudentId(userData.user.user_id); // ✅ Set studentId

          if (courseId) {
            const courseRes = await axios.get(`http://localhost:5000/api/course/${courseId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            const course = courseRes.data.course;
            setCourseName(course.course_name);

            setMessages([
              {
                sender: 'bot',
                text: `Hi ${userName}! What do you want to learn from the course "${course.course_name}"?`,
              },
            ]);
          } else {
            setMessages([
              {
                sender: 'bot',
                text: `Hi ${userName}! How can I help you today?`,
              },
            ]);
          }
        } else {
          setMessages([
            { sender: 'bot', text: 'Hi! How can I help you today?' },
          ]);
        }
      } catch (error) {
        console.error('Error fetching user or course:', error);
        setMessages([{ sender: 'bot', text: 'Hi! How can I help you today?' }]);
      }
    };

    fetchUserAndCourse();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chatEnded) return;

    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');

    try {
      let res;
      const payload = { message: userMessage };

      if (courseId) payload.course_id = courseId;
      if (studentId) payload.student_id = studentId; // ✅ Optional

      const endpoint = courseId
        ? 'http://localhost:8000/api/chat'
        : 'http://localhost:8000/api/chat-ai';

      res = await axios.post(endpoint, payload);
      console.log(studentId);

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: res.data.response },
      ]);
    } catch (err) {
      console.error(err);
      toast.error('Oops! Something went wrong.');
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Oops! Something went wrong.' },
      ]);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleShare = async (text) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Chat Reply from StudIQ AI', text });
        toast.success('Shared successfully!');
      } catch {
        toast.error('Failed to share.');
      }
    } else {
      toast.info('Sharing not supported on this device.');
    }
  };

  const endChat = () => {
    setChatEnded(true);
    toast.info('Chat ended. Please leave a review.');
  };

  return (
    <div className="bg-white min-h-screen pt-[120px] px-6 text-black ml-40 mr-40 flex flex-col">
      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto border rounded-xl bg-gray-50 shadow-inner p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative px-4 py-3 rounded-2xl max-w-[75%] text-sm md:text-base shadow-md transition-all duration-300 ${
              msg.sender === 'user'
                ? 'bg-yellow-400 text-black rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none'
            }`}>
              <div><ReactMarkdown>{msg.text}</ReactMarkdown></div>

              {msg.sender === 'bot' && (
                <div className="flex justify-end gap-2 mt-2 text-gray-500 text-xs">
                  <button onClick={() => handleCopy(msg.text)} className="hover:text-black">
                    <IoCopyOutline />
                  </button>
                  <button onClick={() => handleShare(msg.text)} className="hover:text-black">
                    <IoShareSocialOutline />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* End Chat + Review */}
      {chatEnded ? (
        <div className="mt-6 p-4 border rounded-xl bg-gray-100 shadow-md">
          <h3 className="font-semibold mb-2 text-gray-700">We’d love your feedback! 🌟</h3>
          <textarea
            rows="3"
            className="w-full border rounded-md p-2 text-sm focus:outline-none"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button
            onClick={() => {
              toast.success('Thanks for your feedback!');
              setReview('');
            }}
            className="mt-2 bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-full text-sm font-medium transition"
          >
            Submit Review
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="sticky bottom-6 z-10 mt-4 bg-white py-2">
          <div className="flex gap-2 items-center border border-gray-300 rounded-full px-4 py-2 shadow-md">
            <input
              type="text"
              className="flex-1 bg-transparent focus:outline-none text-sm md:text-base"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) handleSubmit(e);
              }}
              disabled={chatEnded}
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm md:text-base px-4 py-2 rounded-full transition"
              disabled={chatEnded}
            >
              Send
            </button>
          </div>
          <div className="flex justify-center mt-2">
            <button
              type="button"
              onClick={endChat}
              className="text-red-600 text-xs underline hover:text-red-800"
            >
              End Chat
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Chat;
