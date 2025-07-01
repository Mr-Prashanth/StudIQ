import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoCopyOutline, IoShareSocialOutline } from 'react-icons/io5';

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi Gokul! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [chatEnded, setChatEnded] = useState(false);
  const [review, setReview] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chatEnded) return;

    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');

    try {
      const res = await axios.post('http://localhost:8000/api/chat', {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: res.data.response },
      ]);
    } catch (err) {
      console.error(err);
      toast.error('Oops! Something went wrong. Please try again.');
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
        await navigator.share({
          title: 'Chat Reply from StudIQ AI',
          text,
        });
        toast.success('Shared successfully!');
      } catch (err) {
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
      {/* Chat window */}
      <div className="flex-1 overflow-y-auto border rounded-xl bg-gray-50 shadow-inner p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative px-4 py-3 rounded-2xl max-w-[75%] text-sm md:text-base shadow-md transition-all duration-300 ${
              msg.sender === 'user'
                ? 'bg-yellow-400 text-black rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none'
            }`}>
              <p>{msg.text}</p>

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

      {/* End chat and review */}
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
        // Input form
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
