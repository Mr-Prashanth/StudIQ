import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContexts';
import { assets } from '../assets/assets';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthForm from '../components/AuthForm';
import GoogleLoginButton from '../components/GoogleLoginButton';

const Login = () => {
  const { setShowLogin, setUser, showSignUp, setShowSignUp } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = showSignUp
      ? "http://localhost:5000/api/users/register"
      : "http://localhost:5000/api/users/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success(data.message || "Login successful!");
      if (data.token) localStorage.setItem("token", data.token);
      console.log(data.token);
localStorage.setItem("user_role", data.user.role);
localStorage.setItem("user_id", data.user.user_id); // ✅ ADD THIS

      setUser(true);
      setShowLogin(false);
      if (data.user?.role === "admin") {
  navigate("/admin");
} else if (data.user?.role=="teacher"){
  navigate("/teacher");
}else {
  navigate("/main");
}

    } catch (error) {
      setLoading(false);
      console.error("Auth error:", error);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-md rounded-xl p-8 shadow-lg relative">
        <button onClick={() => setShowLogin(false)} className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black">
          <IoClose />
        </button>

        <div className="flex justify-center mb-6">
          <img src={assets.logo} alt="studiq" className="w-24 h-24 rounded-full" />
        </div>

        <h2 className="text-center text-2xl font-bold mb-4 text-[#1d4ed8] font-roboto">
          {showSignUp ? 'Create Your Account' : 'Welcome Back'}
        </h2>

        <AuthForm
          formData={formData}
          handleInputChange={handleInputChange}
          showSignUp={showSignUp}
          showPassword={showPassword}
          togglePassword={togglePassword}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <div className="my-3 text-center text-sm text-gray-400 font-semibold font-roboto">OR</div>
        <GoogleLoginButton onSuccess={() => {
  setUser(true);
  setShowLogin(false);
  navigate("/main");
}} />

        <p className="mt-4 text-center text-sm font-roboto">
          {showSignUp ? (
            <>Already have an account? <span className="text-[#1d4ed8] font-semibold cursor-pointer" onClick={() => setShowSignUp(false)}>Login here</span></>
          ) : (
            <>New to STUDIQ? <span className="text-[#1d4ed8] font-semibold cursor-pointer" onClick={() => setShowSignUp(true)}>Sign up here</span></>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
