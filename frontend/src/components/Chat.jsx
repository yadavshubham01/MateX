import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useSocket from "../hook/useSocket"; // Assuming this is your custom hook for socket connection
import { v4 as uuidv4 } from "uuid";

const Chat = ({ currentUser, chatWithUser, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null); // To scroll to the latest message
  const socket = useSocket(); // Assuming this returns a Socket.IO client instance

  useEffect(() => {
    // Fetch existing messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/messages/${roomId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMessages(response.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Listen for new messages
    socket.current.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.current.off("newMessage");
    };
  }, [roomId, socket]);

  useEffect(() => {
    // Scroll to the latest message whenever messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      id: uuidv4(), // Generate a unique ID for the message
      sender: currentUser.id,
      receiver: chatWithUser.id,
      content: newMessage,
      room: roomId,
      timestamp: new Date().toISOString(), // Add a timestamp
    };

    try {
      socket.current.emit("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]); // Optimistically update the UI
      setNewMessage(""); // Clear the input
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  if (loading)
    return <div className="text-center text-gray-500 mt-10">Loading messages...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100 border border-gray-300">
      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 ${
              msg.sender === currentUser.id ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === currentUser.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{msg.content}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Section */}
      <div className="p-4 bg-gray-200 border-t border-gray-300 flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
