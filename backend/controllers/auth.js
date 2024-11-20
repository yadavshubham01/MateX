const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const Project = require("../models/project");

// Register a user
exports.register = async (req, res) => {
  const { email, password ,username } = req.body;
  try {
    const user = new User({ email, password ,username });
    await user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Match the key 'profileImage'


exports.createProfile = async (req, res) => {
  const { location, bio } = req.body;
  const profileImage = req.file ? req.file.path : null; // Get the uploaded file path

  try {
      
      const user = await User.findById(req.user._id)
      if (!user) {
        return res.status(404).json({ error: "User  not found" }); // Handle case where user is not found
    }

     
      user.location = location;
      user.bio = bio;
      user.profileImage = profileImage; // Save the profile image path
      user.profileImage = profileImage ? profileImage.replace('uploads/', '') : null;
      await user.save(); // Save updated user information
    

      res.status(200).json({ message: "Profile created successfully", user: {
        ...user.toObject(),
        profileImage: user.profileImage ? `http://localhost:5000/${user.profileImage}` : null,
      }, });
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
};
// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




exports.Profile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const posts = await Project.find({ createdBy: user._id });
        const likedPosts = await Project.find({ likes: user._id });
        
        const profileImage = user.profileImage || 
            (user.profileImage ? `http://localhost:5000/${user.profileImage}` : null);

        res.json({
            user: {
                id: user._id,
                email:user.email,
                username: user.username,
                profileImage,
                location: user.location,
                bio: user.bio,
            },
            posts,
            likedPosts,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};