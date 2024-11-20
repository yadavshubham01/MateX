const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const { protect } = require("../middleware");


// Get all messages between two users
router.get("/:room", protect, async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room })
      .sort({ createdAt: 1 })
      .populate("sender", "username profileImage")
      .populate("receiver", "username profileImage");

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

module.exports = router;
