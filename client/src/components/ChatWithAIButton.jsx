import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';

const ChatWithAIButton = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-4 flex justify-center">
      <button
        onClick={() => navigate('/chat')}
        className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-full shadow-md transition duration-200"
      >
        <FaRobot className="text-lg" />
        Chat with AI
      </button>
    </div>
  );
};

export default ChatWithAIButton;
