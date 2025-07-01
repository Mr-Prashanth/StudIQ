import { format } from 'date-fns';

const upcomingEvents = [
  { title: "Life Contingency Tutorials", date: "2025-07-08" },
  { title: "Social Insurance Test", date: "2025-07-13" },
  { title: "Adv. Maths Assignment", date: "2025-07-18" },
  { title: "Tutorial Class", date: "2025-07-23" },
];

const CalendarWidget = () => {
  const today = new Date();

  return (
    <div className="bg-white text-black rounded-xl p-4 shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">My Progress</h2>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-4">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d, i) => (
          <div key={i} className="font-medium">{d}</div>
        ))}
        {[...Array(30)].map((_, i) => {
          const day = i + 1;
          return (
            <div
              key={i}
              className={`p-1 rounded-full ${
                day === today.getDate() ? "bg-yellow-400 text-white font-semibold" : "text-gray-700"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Upcoming Events */}
      <h3 className="text-md font-semibold mb-2">Upcoming Activities</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {upcomingEvents.map((e, i) => (
          <li key={i} className="flex justify-between items-center">
            <span className="truncate w-[70%]">{e.title}</span>
            <span className="text-yellow-500 font-medium">{format(new Date(e.date), "MMM d")}</span>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default CalendarWidget;
