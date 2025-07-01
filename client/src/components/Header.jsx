import React from 'react';
import { assets } from '../assets/assets';
import Scroll from './Scroll'; // adjust path as necessary

const Header = () => {
  return (
    <div
      className="pt-16 pb-16 text-white bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${assets.ai_bg})`,
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="ml-40 mr-40 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl bg-black bg-opacity-60 rounded-xl px-8 py-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-roboto">
            Your <span className="text-[#38bdf8] animate-pulse">AI powered</span><br />
            learning management system,<br />
            <span className="text-[#60a5fa] animate-bounce">STUDIQ</span>.
          </h1>

          <Scroll />
        </div>
      </div>
    </div>
  );
};

export default Header;
