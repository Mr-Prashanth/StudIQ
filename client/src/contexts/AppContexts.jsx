import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : false;
  });

  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [lightmode, setLightMode] = useState(true);

  const scrollTexts = ["Smarter Notes", "Sharper Answers", "Simpler Learning", "AI Personalized"];
  const scrollColors = ["text-red-500", "text-pink-500", "text-green-500", "text-yellow-500"];

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    lightmode,
    setLightMode,
    showSignUp,
    setShowSignUp,
    scrollTexts,
    scrollColors, // ✅ Include them in context
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
