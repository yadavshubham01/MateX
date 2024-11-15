const express = require("express");
const jwt = require('jsonwebtoken');
const { register, login ,Profile ,createProfile} = require("../controllers/auth");
const { protect } = require("../middleware");
const { OAuth2Client } = require("google-auth-library");
const { GOOGLE_CLIENT_ID,JWT_SECRET } = require("../config");
const User = require('../models/user');
const router = express.Router();
const client = new OAuth2Client(GOOGLE_CLIENT_ID);



const passport = require("passport");


router.post("/google", async (req, res) => {
  try{
    const { idToken } = req.body;
    const ticket = await client.verifyIdToken({
      idToken,
      audience:GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
  
    // Check if user already exists
    let existingUser  = await User.findOne({ googleId: payload.sub });
    if (existingUser ) {
      const token = jwt.sign({ userId: existingUser ._id }, JWT_SECRET, { expiresIn: "1h" });
      return res.json({ token, user: existingUser  });
    }
  
    // If not, create a new user
    const newUser  = new User({
      googleId: payload.sub,
      username: payload.name,
      email: payload.email,
      profileImage: payload.picture,
    });
    await newUser .save();
  
    const token = jwt.sign({ userId: newUser ._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: newUser  });
   } catch (err) {
      res.status(500).json({ message: "Google login failed", error: err.message });
    }
  });
// Auth with Google


// Callback route for Google to redirect to
router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: '/', // Redirect if authentication fails
}), (req, res) => {
  // Successful authentication, redirect home or send token
  res.redirect("http://localhost:5173/dashboard"); // Redirect to your frontend
});

module.exports = router;

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, Profile);
router.post("/create", protect, createProfile);
module.exports = router;
