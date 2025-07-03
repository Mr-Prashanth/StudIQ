import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContexts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { setUser, setShowLogin } = useContext(AppContext);

  const handleGoogleLogin = () => {
    const popup = window.open("http://localhost:5000/api/users/google", "_blank", "width=500,height=600");

    const handleMessage = (event) => {
  if (event.origin !== "http://localhost:5000") return;

  const { token, googleToken, role } = event.data;
  if (token && googleToken) {
    localStorage.setItem("token", token);
    localStorage.setItem("gmail_token", googleToken);
    localStorage.setItem("user_role", role); // optional

    setUser(true);
    setShowLogin(false);
    toast.success("Login successful via Google!");

    // ✅ Redirect based on role
    if (role === "admin") {
      navigate("/admin");
    } else if (role=="teacher"){
      navigate("/teacher");
    }else {
      navigate("/main");
    }

    popup?.close();
    window.removeEventListener("message", handleMessage);
  }
};


    window.addEventListener("message", handleMessage);
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full border px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition font-roboto"
    >
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
