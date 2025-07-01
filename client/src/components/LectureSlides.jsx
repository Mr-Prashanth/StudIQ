import React from 'react';

const LectureSlides = ({ slides, doneSlides, toggleDone }) => (
  <ul className="list-none text-blue-600 space-y-2">
    {slides.map((slide, i) => (
      <li key={i} className="flex justify-between items-center">
        <a
          href={`#${slide}`}
          className={`hover:underline ${doneSlides[i] ? ' text-red-500' : ''}`}
        >
          {slide}
        </a>
        <button
          onClick={() => toggleDone('slide', i)}
          className={`text-sm px-3 py-1 rounded-full ${doneSlides[i]
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
        >
          {doneSlides[i] ? 'Done' : 'Mark as Done'}
        </button>
      </li>
    ))}
  </ul>
);

export default LectureSlides;