import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AlertBox = ({
  isOpen,
  icon: Icon,
  title,
  body,
  onClose,
  color = "blue",
}) => {
  // 🔹 Auto-close after 1 second when alert opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="
            fixed 
            top-10 
            left-1/2 
            -translate-x-1/2 
            z-50 
            flex 
            items-center 
            justify-center
          "
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow p-5 sm:p-6 w-[70vw] sm:w-[400px] text-center border border-gray-200"
          >
            {Icon && (
              <Icon
                className={`mx-auto mb-3 ${
                  color === "red"
                    ? "text-rose-600"
                    : color === "green"
                    ? "text-green-600"
                    : "text-blue-600"
                } ${window.innerWidth < 640 ? "w-8 h-8" : "w-10 h-10"}`}
              />
            )}

            <h2
              className={`font-semibold ${
                window.innerWidth < 640 ? "text-[14px]" : "text-lg"
              } text-gray-800`}
            >
              {title}
            </h2>

            {body && (
              <p
                className={`mt-1 text-gray-600 ${
                  window.innerWidth < 640 ? "text-xs" : "text-sm"
                }`}
              >
                {body}
              </p>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AlertBox;
