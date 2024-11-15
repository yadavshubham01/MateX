const express = require("express");
const session = require("express-session");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const config = require('./config');
const passport = require("passport");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cors());
 // Import the passport setup

 app.use(session({
  secret: 'Shubham@123', // Replace with your own secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using https
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
// Routes
app.use("/api/auth", require("./routes/user"));
app.use("/api/projects", require("./routes/project"));

// Real-time messaging
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", ({ room }) => {
    socket.join(room);
  });

  socket.on("message", ({ room, message }) => {
    io.to(room).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

mongoose.connect(config.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Start server
const PORT = config.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
