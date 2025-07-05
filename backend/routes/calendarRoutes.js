// routes/calendarRoutes.js
import express from "express";
import { addEvent, getUserEvents } from "../controllers/calendarController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", verifyToken, addEvent);
router.get("/my-events", verifyToken, getUserEvents);

export default router;
