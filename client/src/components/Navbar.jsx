import React, { useContext } from 'react';
import { assets } from "./../assets/assets";
import { AppContext } from '../contexts/AppContexts';
import { Link, useNavigate } from 'react-router-dom';
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { toast } from 'react-toastify';
import { IoNotifications } from "react-icons/io5";

const Navbar = () => {
  const { user, setUser, setShowLogin, lightmode, setLightMode } = useContext(AppContext);
  const navigate = useNavigate();
  const role = localStorage.getItem("user_role");

  const handleLogout = () => {
    setUser(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('gmail_token');
    localStorage.removeItem('user_role');
    navigate('/');
    toast.success("Logged out successfully");
  };

  return (
    <div className="fixed top-5 z-50 left-40 right-40">
      <div className="bg-yellow-50 w-full shadow-md rounded-xl">
        <div className="flex justify-between items-center h-20 px-6">
          {/* Left section: Logo + Nav Links */}
          <div className="flex items-center gap-10">
            {/* Logo link based on role */}
            {user ? (
              <Link to={
  role === "admin" ? "/admin" :
  role === "teacher" ? "/teacher" :
  "/main"
}>
  <img
    src={assets.logo}
    className="w-32 sm:w-36 lg:w-44 rounded-full hover:scale-105 duration-150 transition-all"
    alt="studiq logo"
  />
</Link>
            ) : (
              <Link to="/">
                <img
                  src={assets.logo}
                  className="w-32 sm:w-36 lg:w-44 rounded-full hover:scale-105 duration-150 transition-all"
                  alt="studiq logo"
                />
              </Link>
            )}

            {/* Nav links visible only to non-admin users */}
            {user && role !== "admin" && role !== "teacher" && (
  <div className="flex gap-6 text-sm sm:text-base md:text-lg font-medium text-gray-700">
    <Link to="/main" className="hover:text-black transition">Home</Link>
    <Link to="/dashboard" className="hover:text-black transition">Dashboard</Link>
    <Link to="/courses" className="hover:text-black transition">Courses</Link>
  </div>
)}

          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-6">
            {/* Theme Toggle */}
            {lightmode ? (
              <button onClick={() => setLightMode(false)} className="text-xl text-gray-600 hover:text-black transition">
                <MdLightMode />
              </button>
            ) : (
              <button onClick={() => setLightMode(true)} className="text-xl text-gray-600 hover:text-black transition">
                <MdDarkMode />
              </button>
            )}

            {/* Notification */}
            {user && (
              <button className="text-2xl text-gray-600 hover:text-black transition">
                <IoNotifications />
              </button>
            )}

            {/* Auth Button */}
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-full text-sm hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
