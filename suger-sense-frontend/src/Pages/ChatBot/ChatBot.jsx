import React, { useEffect, useState, useRef } from "react";
import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaHeartbeat,
  FaSmile,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useAuth from "../../api/Hooks/useAuth";
import useAxiosSecure from "../../api/Hooks/useAxiosSecure";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm SugarSense AI 🩺, your health assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const bottomRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axiosSecure.post(`/chatbot?email=${user.email}`, {
        message: input,
      });
      const reply = res.data?.reply || "Sorry, I couldn’t get that.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "❌ Error: Unable to get response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axiosSecure.get("chatbot/history");
        const history = res.data.data
          .map((c) => [
            { role: "user", content: c.message },
            { role: "assistant", content: c.reply },
          ])
          .flat();
        setMessages([
          { role: "assistant", content: "Welcome back! Let’s continue your health journey." },
          ...history,
        ]);
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      }
    };
    fetchHistory();
  }, []);

  // scroll btn
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[90vh] max-w-3xl sm:w-full mx-2 sm:mx-auto mt-6 bg-gradient-to-b from-blue-50 via-white to-blue-100 rounded-3xl shadow border border-blue-100 sm:h-[85vh] overflow-hidden">
     
      <div className=" px-5 py-3 bg-[#2E4987] font-extrabold text-center mb-10  flex justify-center items-center gap-2">
        <FaRobot className="text-white text-2xl" />
        <h2 
        className=" bg-gradient-to-b from-[#fafcfd] text-2xl via-[#eafaf7] to-[#ffe9d6] text-transparent bg-clip-text tracking-wide"
        // data-aos="fade-down"
        >SugarSense AI</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-blue-300">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <FaRobot className="text-[#2E4987] mt-1 mr-2 sm:mr-3 text-lg sm:text-xl" />
            )}
            <div
              className={`p-3 sm:p-4 rounded-2xl max-w-[80%] sm:max-w-[70%] break-words text-sm sm:text-base leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#2E4987] text-white rounded-br-none shadow"
                  : "card-bg-n text-gray-900 shadow rounded-bl-none"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline hover:text-blue-900"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
            {msg.role === "user" && (
              <FaUser className="text-[#2E4987] mt-1 ml-2 sm:ml-3 text-lg sm:text-xl" />
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-gray-500 animate-pulse">
            <FaRobot className="text-blue-500" />
            <p>Typing...</p>
          </div>
        )}
        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="border-t bg-white p-3 sm:p-4 flex items-center gap-2 sm:gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about diabetes, diet, exercise, or tips..."
          className="flex-1 border border-gray-300 rounded-xl px-3 sm:px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#2E4987] hover:bg-blue-700 transition text-white p-3 sm:p-3.5 rounded-xl flex items-center justify-center disabled:opacity-50"
        >
          <FaPaperPlane />
        </button>
      </form>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 bg-blue-50 py-2 border-t">
        Powered by <span className="font-extrabold text-[#2E4987]">SugarSense AI</span> <FaSmile className="inline ml-1 text-[#2E4987] font-extrabold" />
      </div>
    </div>
  );
};

export default ChatBot;
