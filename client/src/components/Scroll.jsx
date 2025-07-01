import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContexts';

const Scroll = () => {
  const { scrollTexts, scrollColors } = useContext(AppContext);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % scrollTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [scrollTexts.length]);

  return (
    <div className={`text-5xl text-center font-roboto font-semibold min-h-[100px] transition-all duration-500 ease-in-out ${scrollColors[index]}`}>
      <h2 className="animate-fadeIn">{scrollTexts[index]}</h2>
    </div>
  );
};

export default Scroll;
