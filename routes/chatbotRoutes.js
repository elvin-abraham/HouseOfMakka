const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");

router.get("/chatbot", chatbotController.renderChatbot);
router.post("/chatbot", chatbotController.handleChatbot);

module.exports = router;