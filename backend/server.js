const express = require("express");
const session = require("express-session");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const config = require('./config');
const passport = require("passport");
const Message = require("../backend/models/message");
const path = require('path');

const app = express();
const server = http.createServer(app);
const allowedOrigins = ['https://mate-x.vercel.app', 'http://localhost:5173']; 
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins, // Your frontend URL
    methods: ["GET", "POST"], // Allowed methods
    credentials: true, // Allow cookies/auth headers
  },
});

app.use(express.json());
app.use(cors({
  origin: allowedOrigins, // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Allow cookies or authentication headers
}));
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", require("./routes/user"));
app.use("/api/projects", require("./routes/project"));
app.use("/api/messages", require("./routes/message"));


// Real-time messaging
io.on("connection", (socket) => {
  console.log("New client connected");

  // Join a private chat room
  socket.on("joinRoom", ({ room }) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Handle sending a message
  socket.on("sendMessage", async ({ sender, receiver, content, room }) => {
    try {
      // Save the message in the database
      if (!mongoose.Types.ObjectId.isValid(sender) || !mongoose.Types.ObjectId.isValid(receiver)) {
        throw new Error("Invalid sender or receiver ID");
      }
      const message = new Message({
        sender: mongoose.Types.ObjectId(sender),
        receiver: mongoose.Types.ObjectId(receiver),
        content,
        room,
        timestamp: new Date(),
      });
      await message.save();

      // Broadcast the message to the room
      io.to(room).emit("newMessage", {
        sender,
        content,
        timestamp: message.timestamp,
      });
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  // Disconnect
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
