import React from 'react';

const Attendance = ({ attendance }) => (
  <ul className="list-disc pl-5 text-gray-700 space-y-1">
    {attendance.map((entry, i) => <li key={i}>{entry}</li>)}
  </ul>
);

export default Attendance;