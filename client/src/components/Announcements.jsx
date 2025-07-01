import React from 'react';

const Announcements = ({ announcements }) => (
  <ul className="list-disc pl-5 text-gray-700 space-y-1">
    {announcements.map((note, i) => <li key={i}>{note}</li>)}
  </ul>
);

export default Announcements;