import { motion, AnimatePresence } from "framer-motion";

const AlertBox = ({
  isOpen,
  icon: Icon,
  title,
  body,
  onClose,
  color = "blue",
}) => {
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
            className="bg-white rounded-2xl shadow p-5 sm:p-6 w-[85%] sm:w-[400px] text-center border border-gray-200"
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

            <button
              onClick={onClose}
              className={`mt-4 w-full rounded-lg cursor-pointer text-white font-medium ${
                color === "red"
                  ? "bg-rose-600 hover:bg-rose-700"
                  : color === "green"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } ${window.innerWidth < 640 ? "text-xs py-1.5" : "text-sm py-2"}`}
            >
              OK
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AlertBox;
