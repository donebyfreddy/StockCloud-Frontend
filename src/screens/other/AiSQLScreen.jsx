import React, { useState } from "react";
import axios from "axios";
import { ChatBubble, Send } from "@mui/icons-material";
import { REACT_APP_API_URL } from "../../router"; // Ensure this is correctly set

function AiSQLScreen() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (message.trim() === "") return;

    const newChat = { sender: "User", message };
    setChatHistory([...chatHistory, newChat]);

    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/other/chatbot`, { query: message });
      const botResponse = { sender: "Bot", message: response.data.answer };

      setChatHistory((prevChat) => [...prevChat, botResponse]);
    } catch (error) {
      const errorResponse = {
        sender: "Bot",
        message: "Something went wrong. Please try again.",
      };
      setChatHistory((prevChat) => [...prevChat, errorResponse]);
    }

    setMessage("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Reduced height, kept wider dimensions */}
      <div className="w-[800px] h-[500px] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white text-center py-4 px-6 rounded-t-3xl flex justify-between items-center">
          <h2 className="text-3xl font-semibold tracking-wide">SQL Chatbot</h2>
          <ChatBubble className="text-4xl animate-pulse" />
        </div>
        <div className="p-6 flex-grow overflow-y-auto space-y-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`chat-message ${chat.sender === "User" ? "text-right text-gray-800" : "text-left text-green-500"}`}
            >
              <div className={`font-semibold ${chat.sender === "User" ? "text-green-600" : "text-green-500"}`}>
                {chat.sender}:
              </div>
              <p className="mt-1 text-lg">{chat.message}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center border-t border-gray-300 p-4 space-x-4">
          <input
            type="text"
            placeholder="Ask SQL..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-grow py-3 px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out text-lg"
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-full shadow-md hover:scale-105 transform transition-all duration-200"
          >
            <Send className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiSQLScreen;
