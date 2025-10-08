import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaHeart,
  FaSmile,
  FaExclamationTriangle,
  FaSkullCrossbones,
} from "react-icons/fa";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const calculateBMI = (e) => {
    e.preventDefault();
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);

    if (!h || !w) {
      setBmi(null);
      setStatus("Please enter valid values.");
      setIcon(null);
      return;
    }

    const result = (w / (h * h)).toFixed(1);
    setBmi(result);

    if (result < 18.5) {
      setStatus("Underweight");
      setIcon(<FaHeart className="text-blue-500 inline-block ml-2" />);
    } else if (result < 24.9) {
      setStatus("Normal weight");
      setIcon(<FaSmile className="text-green-500 inline-block ml-2" />);
    } else if (result < 29.9) {
      setStatus("Overweight");
      setIcon(
        <FaExclamationTriangle className="text-yellow-500 inline-block ml-2" />
      );
    } else {
      setStatus("Obese");
      setIcon(<FaSkullCrossbones className="text-red-500 inline-block ml-2" />);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-6">
      <div
        className="card-bg-n p-8 rounded-2xl shadow-xl max-w-md w-full"
        data-aos="fade-up"
      >
        <h1
          className="text-3xl font-bold text-center mb-4 text-blue-700 flex justify-center items-center gap-2"
          data-aos="fade-down"
        >
          <FaHeart className="text-blue-600" /> BMI Calculator
        </h1>
        <p className="text-center text-gray-600 mb-6" data-aos="fade-up">
          Calculate your Body Mass Index to understand your health status.
        </p>

        <form onSubmit={calculateBMI} className="space-y-4" data-aos="zoom-in">
          <div>
            <label className="block text-left text-gray-700 mb-1">
              Height (in cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 170"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 mb-1">
              Weight (in kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 65"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-b from-[#3b5998] via-[#3b5998] to-[#192f6a] hover:from-[#fafcfd] hover:via-[#eafaf7] hover:to-[#ffe9d6] text-white hover:text-blue-600 py-2 px-4 rounded-md transition duration-300 ease-in-out cursor-pointer "
          >
            Calculate
          </button>
        </form>

        {bmi && (
          <div
            className="mt-6 text-center card-bg-n p-4 rounded-lg shadow"
            data-aos="fade-up"
          >
            <h2 className="text-2xl font-semibold text-blue-700">
              Your BMI: {bmi}
            </h2>
            <p
              className={`mt-2 text-lg font-medium flex justify-center items-center gap-2 ${
                status.includes("Normal")
                  ? "text-green-600"
                  : status.includes("Overweight")
                  ? "text-yellow-600"
                  : status.includes("Obese")
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {status} {icon}
            </p>
          </div>
        )}
      </div>

      <p className="text-gray-600 mt-6" data-aos="fade-up">
        BMI is just one indicator — consult your doctor for accurate assessment.
      </p>
    </div>
  );
};

export default BMICalculator;
