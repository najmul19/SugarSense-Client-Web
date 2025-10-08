import React from "react";

const CustomButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-[#3b82f6] via-[#2563eb] to-[#1e3a8a]
      hover:from-[#60a5fa] hover:via-[#3b82f6] hover:to-[#2563eb]
      text-white font-semibold
      py-2 px-5 rounded-lg shadow-md
      transform hover:scale-105
      transition duration-300 ease-in-out cursor-pointer"
    >
      {text}
    </button>
  );
};

export default CustomButton;
