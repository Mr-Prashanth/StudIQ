// controllers/calendarController.js

import { Calendar } from "../models/index.js";

export const addEvent = async (req, res) => {
  try {
    const { title, date } = req.body;
    const user_id = req.user.id; // From JWT middleware

    const newEvent = await Calendar.create({ title, date, user_id });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Add event error:", error);
    res.status(500).json({ error: "Failed to add event" });
  }
};

export const getUserEvents = async (req, res) => {
  try {
    const user_id = req.user.id;

    const events = await Calendar.findAll({
      where: { user_id },
      order: [["date", "ASC"]],
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Fetch events error:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
