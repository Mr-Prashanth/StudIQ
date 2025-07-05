import { useEffect, useState } from "react";
import { format, parseISO, isAfter, startOfMonth } from "date-fns";
import axios from "axios";

const CalendarWidget = () => {
  const today = new Date();
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/api/calendar/my-events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const upcoming = res.data
        .filter((event) => isAfter(parseISO(event.date), today))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 4);

      setEvents(upcoming);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleAddEvent = async () => {
    if (!title || !date) return alert("Title and date required.");

    try {
      await axios.post(
        "/api/calendar/add",
        { title, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDate("");
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      console.error("Error adding event:", err);
      alert("Failed to add event.");
    }
  };

  // Get first day offset for alignment
  const monthStart = startOfMonth(today);
  const offset = (monthStart.getDay() + 6) % 7;

  return (
    <div className="bg-white text-black rounded-xl p-4 shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">My Progress</h2>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-4">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d, i) => (
          <div key={i} className="font-medium">
            {d}
          </div>
        ))}
        {[...Array(offset)].map((_, i) => (
          <div key={`offset-${i}`} />
        ))}
        {[...Array(30)].map((_, i) => {
          const day = i + 1;
          const fullDate = `${today.getFullYear()}-${String(
            today.getMonth() + 1
          ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          return (
            <div
              key={i}
              onDoubleClick={() => {
                setDate(fullDate);
                setShowForm(true);
              }}
              className={`p-1 cursor-pointer rounded-full ${
                day === today.getDate()
                  ? "bg-yellow-400 text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              title="Double-click to add event"
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Add Event */}
{showForm && (
  <div className="mb-4">
    <h3 className="text-md font-semibold mb-2">Add New Event</h3>
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-start w-full flex-wrap">
      <input
        type="text"
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-1 px-2 rounded-md text-sm w-full sm:w-auto"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-1 px-2 rounded-md text-sm w-full sm:w-auto"
      />
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={handleAddEvent}
          className="bg-yellow-400 text-white px-4 py-1 rounded-md hover:bg-yellow-500 text-sm"
        >
          Add
        </button>
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-600 text-sm underline"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      {/* Upcoming Events */}
      <h3 className="text-md font-semibold mb-2">Upcoming Activities</h3>
      <ul className="space-y-2 text-sm text-gray-700">
        {events.length === 0 && (
          <li className="text-gray-400">No upcoming events</li>
        )}
        {events.map((e, i) => (
          <li key={i} className="flex justify-between items-center">
            <span className="truncate w-[70%]">{e.title}</span>
            <span className="text-yellow-500 font-medium">
              {format(new Date(e.date), "MMM d")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarWidget;
