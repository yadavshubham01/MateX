const express = require("express");
const jwt = require('jsonwebtoken');
const { register, login ,Profile ,createProfile} = require("../controllers/auth");
const { protect } = require("../middleware");
const { OAuth2Client } = require("google-auth-library");
const { GOOGLE_CLIENT_ID,JWT_SECRET } = require("../config");
const User = require('../models/user');
const router = express.Router();
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const multer = require("multer");
const path = require("path");



const passport = require("passport");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
}).single('profileImage'); 

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
    await newUser.save();
  
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

router.get('/all', async (req, res) => {
  const { query } = req.query; // Get the search query from the request
  
  try {
    let searchQuery = {};
    if (query) {
      searchQuery = {
        $or: [
          { username: { $regex: query, $options: 'i' } }, // Case-insensitive search by username
          { email: { $regex: query, $options: 'i' } } // Case-insensitive search by email
        ]
      };
    }
    
    const users = await User.find(searchQuery, 'username email profileImage'); // Select only necessary fields
    res.json({ success: true, data: users });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, Profile);
router.post("/create", protect, upload, createProfile);
module.exports = router;
