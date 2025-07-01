import React from 'react';

const Lectures = ({ lectures, doneLectures, toggleDone }) => (
  <ul className="text-gray-700 space-y-2">
    {lectures.map((lecture, i) => (
      <li key={i} className="flex justify-between items-center">
        <span className={doneLectures[i] ? ' text-red-500' : ''}>{lecture}</span>
        <button
          onClick={() => toggleDone('lecture', i)}
          className={`text-sm px-3 py-1 rounded-full ${doneLectures[i]
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
        >
          {doneLectures[i] ? 'Done' : 'Mark as Done'}
        </button>
      </li>
    ))}
  </ul>
);

export default Lectures;