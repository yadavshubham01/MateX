import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useSocket from "../hook/useSocket"; 
import { v4 as uuidv4 } from "uuid";

const Chat = ({ currentUser, chatWithUser, roomId, onBack}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null); 
  const socket = useSocket(); 

  useEffect(() => {
    
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

    
    socket.current.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.current.off("newMessage");
    };
  }, [roomId, socket]);

  useEffect(() => {
    
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      id: uuidv4(), 
      sender: currentUser.id,
      receiver: chatWithUser.id,
      content: newMessage,
      room: roomId,
      timestamp: new Date().toISOString(), 
    };

    try {
      socket.current.emit("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]); 
      setNewMessage(""); 
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
    <div className="flex flex-col h-screen bg-black border text-gray-200 border-gray-300">
      <div className="flex items-center justify-between p-4 bg-black border-b border-gray-300">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-black text-gray-200 rounded-md hover:bg-neutral-700"
        >
          Go Back
        </button>
        <h1 className="text-lg font-bold">{chatWithUser.username}</h1>
      </div>
      
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

     
      <div className="p-4 bg-black border-t border-gray-300 flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 rounded-md bg-black text-gray-200 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
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
