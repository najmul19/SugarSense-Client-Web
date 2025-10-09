import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import ChatBot from "../../Pages/ChatBot/ChatBot";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
     
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(!open); 
        }}
        className="fixed bottom-6 right-6 z-[99999] bg-gradient-to-r from-[#2E4987] to-blue-600 hover:scale-110 active:scale-95 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        {open ? <FaTimes size={22} /> : <FaComments size={26} />}
      </button>

    
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[95%] sm:w-[420px] h-[80vh] sm:h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-slide-up">
          <ChatBot />
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
