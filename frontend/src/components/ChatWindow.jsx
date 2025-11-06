import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const ChatWindow = ({ chat, activeChat }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const backendApi=import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
  //  Initialize socket once
  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { withCredentials: true });
    return () => socketRef.current.disconnect();
  }, []);

  //  Fetch messages when chat changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeChat?._id) return;
      try {
        const res = await axios.get(
          backendApi+`/api/message/${activeChat._id}`,
          { withCredentials: true }
        );
        // Keep messages as received from DB
        setMessages(res.data.messages || []);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [activeChat]);

  //  Listen for AI responses
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleAIResponse = (newMessage) => {
      if (newMessage.chatId === activeChat?._id) {
        // Add AI message with local role flag
        setMessages((prev) => [
          ...prev,
          { ...newMessage, role: "model" }, // ensure proper UI rendering
        ]);
      }
    };

    socket.on("ai-response", handleAIResponse);

    return () => {
      socket.off("ai-response", handleAIResponse);
    };
  }, [activeChat]);

  //  Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //  Send message
  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() || !activeChat?._id) return;

    // Create a local user message (UI only)
    const localMsg = {
      _id: Date.now(),
      chatId: activeChat._id,
      content: text,
      role: "user", // local only — not sent to backend
    };

    // Show locally first
    setMessages((prev) => [...prev, localMsg]);

    // Send to backend
    socketRef.current.emit("ai-message", {
      chatId: activeChat._id,
      content: text,
    });

    setText("");
  };

  return (
    <div className="flex flex-col h-full bg-[#0f172a] text-gray-200">
      {/* Header */}
      <div className="border-b border-[#1b2538] p-4">
        <h2 className="text-lg font-semibold">
          {activeChat?.title || "Select a chat"}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center mt-10 text-sm">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-emerald-600 text-white rounded-br-none"
                    : "bg-[#1a2335] text-gray-200 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      {activeChat && (
        <div className="p-4 border-t border-[#1b2538]">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 bg-[#131c2e] px-4 py-2 rounded-md outline-none text-gray-200"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
