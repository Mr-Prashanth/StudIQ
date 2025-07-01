import React from 'react';
import Header from '../components/Header';
import Features from '../components/Features';

const Home = () => {
  return (
    <div className="pt-28 px-0"> 
      <div className="ml-40 mr-40">
        <Header />
        <Features />
      </div>
    </div>
  );
};

export default Home;
