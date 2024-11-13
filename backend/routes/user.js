const express = require("express");
const { register, login ,Profile ,createProfile} = require("../controllers/auth");
const { protect } = require("../middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, Profile);
router.post("/create", protect, createProfile);
module.exports = router;
