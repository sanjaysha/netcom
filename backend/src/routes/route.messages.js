import express from "express";
import {
  getAllContacts,
  getChatsByUserId,
  sendMessage,
  getChatPartners,
} from "../controllers/message.controller.js";
import { arcjectProtection } from "../middleware/arcjet.middleware.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(arcjectProtection, protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getChatsByUserId);
router.post("/send/:id", sendMessage);

export default router;
