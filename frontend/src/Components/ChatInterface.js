import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("https://chatbot-wn6a.onrender.com/history");
        const data = await response.json();

        const history = data.history.map((message, index) => ({
          id: index + 1,
          text: message.message,
          sender: message.sender,
          timestamp: new Date(message.timestamp),
        }));

        setMessages(history);
        scrollToBottom();
      } catch (error) {
        console.log(error.message, "Error From fetching data.");
      }
    };
    fetchHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    try {
      const response = await fetch("https://chatbot-wn6a.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      const botmessage = {
        id:messages.length+2,
        text:data.replay,
        sender:"bot",
        timestamp: new Date()
      }

      setMessages((prev)=> [...prev,botmessage]);

    } catch (error) {
      console.log("Error from getting message", error.message);
      const errorMessage ={
        id:messages.length+2,
        text:"Failed to connect to the server .please try again later.",
        sender:"bot",
        timestamp:new Date()
      };
      setMessages((prev)=>[...prev,errorMessage]);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-gray-50 shadow-xl rounded-lg">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b shadow-sm rounded-t-lg">
        <h1 className="text-xl font-semibold text-gray-800">Chat Assistant</h1>
        <div className="flex items-center mt-1">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm text-gray-500">Online</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none shadow-md"
              }`}
            >
              <p className="break-words">{message.text}</p>
              <span
                className={`text-xs ${
                  message.sender === "user" ? "text-blue-100" : "text-gray-400"
                } block mt-1`}
              >
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="border-t bg-white p-4 rounded-b-lg"
      >
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={!inputMessage.trim()}
          >
            <SendHorizontal className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
