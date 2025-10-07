import React from "react";

const GradientButton = ({ text }) => {
  return (
    <button
      className="bg-gradient-to-b from-[#fafcfd] via-[#eafaf7] to-[#ffe9d6]
                 hover:from-[#4c669f] hover:via-[#3b5998] hover:to-[#192f6a]
                 text-blue-600 hover:text-white font-semibold
                 px-6 py-3 rounded-md transition duration-300 shadow-md cursor-pointer"
    >
      {text}
    </button>
  );
};

export default GradientButton;
