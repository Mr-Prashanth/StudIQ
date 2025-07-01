import { useEffect, useState } from "react";

const CATEGORY_LABELS = {
  Primary: "CATEGORY_PERSONAL",
  Social: "CATEGORY_SOCIAL",
  Promotions: "CATEGORY_PROMOTIONS",
};

const OutlookMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("Primary");

  useEffect(() => {
    const gmailToken = localStorage.getItem("gmail_token");
    if (!gmailToken) {
      setError("No Gmail token found.");
      return;
    }

    const fetchEmails = async () => {
      try {
        const labelId = CATEGORY_LABELS[activeCategory];

        const listRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5&labelIds=${labelId}`,
          {
            headers: {
              Authorization: `Bearer ${gmailToken}`,
            },
          }
        );

        const listData = await listRes.json();
        if (!listData.messages) {
          setMessages([]);
          setError("No messages found.");
          return;
        }

        const messageDetails = await Promise.all(
          listData.messages.map(async (msg) => {
            const detailRes = await fetch(
              `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`,
              {
                headers: {
                  Authorization: `Bearer ${gmailToken}`,
                },
              }
            );
            const detailData = await detailRes.json();
            const headers = detailData.payload.headers;

            const getHeader = (name) =>
              headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value || "";

            return {
              sender: getHeader("From"),
              subject: getHeader("Subject"),
              time: new Date(getHeader("Date")).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
          })
        );

        setMessages(messageDetails);
        setError("");
      } catch (err) {
        console.error("Gmail fetch error:", err);
        setError("Error fetching messages.");
      }
    };

    fetchEmails();
  }, [activeCategory]);

  return (
    <div className="bg-gray-100 rounded-xl p-4 shadow-sm border h-72 overflow-y-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-700">Messages</h2>
        <div className="flex space-x-2">
          {Object.keys(CATEGORY_LABELS).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-2 py-1 text-xs rounded ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {messages.map((msg, i) => (
            <li key={i} className="flex justify-between border-b pb-1">
              <div>
                <p className="font-medium text-gray-800">{msg.sender}</p>
                <p className="text-gray-600 truncate w-48">{msg.subject}</p>
              </div>
              <span className="text-gray-400 text-xs">{msg.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OutlookMessages;
