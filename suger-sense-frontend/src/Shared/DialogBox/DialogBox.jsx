import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const DialogBox = ({ isOpen, title, body, onConfirm, onCancel }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        AOS.init({
          duration: 500, 
          once: true, 
        });
        AOS.refresh();
      }, 250); 

      return () => clearTimeout(timer);
    }
  }, [isOpen]); 

  if (!isOpen) return null;

  return (
    
    <div
      className="fixed top-10 left-1/2 -translate-x-1/2 z-50"
      data-aos="zoom-out"
    >
      <div className="bg-white rounded-xl shadow-lg max-w-sm w-[70vw] sm:w-[400px] p-6 text-center border border-gray-200">
        <h2 className="text-md sm:text-xl font-bold mb-4 text-gray-800">{title}</h2>
        <p className="mb-6 text-sm sm:text-md text-gray-600">{body}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-1  text-md sm:text-xl rounded-md border border-gray-300 hover:bg-gray-500 hover:text-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1 text-md sm:text-xl  rounded-md bg-red-600 hover:bg-red-700 text-white transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
