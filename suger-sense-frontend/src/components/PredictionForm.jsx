import { useState } from "react";
import { usePrediction } from "../api/Hooks/usePrediction";
import ResultCard from "./ResultCard";
import { FaCheckCircle, FaExclamationTriangle, FaHeartbeat } from "react-icons/fa";
import AlertBox from "./AlertBox";
import LoadingSpinner from "../Shared/LoadingSpinner";

import { formSections, fieldLabels, fieldOptions } from "./formConfig";
import { MdWarning } from "react-icons/md";

const PredictionForm = () => {
  const initialForm = Object.keys(fieldLabels).reduce(
    (acc, key) => ({ ...acc, [key]: "" }),
    {}
  );
  const [formData, setFormData] = useState(initialForm);
  const [currentSection, setCurrentSection] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  // const { mutate, data, isLoading } = usePrediction();
  const { mutate, data, isPending: isLoading } = usePrediction();

  const [alert, setAlert] = useState({
    isOpen: false,
    icon: null,
    title: "",
    body: "",
    color: "blue",
  });

  const handleChange = (key, value) => {
    if (key === "BMI") {
      if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setFormData({ ...formData, [key]: value });
      }
    } else {
      setFormData({ ...formData, [key]: Number(value) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    for (const key in formData) {
      if (formData[key] === "") {
        // console.log("formkey: ", formData[key], " key: ", key);
        setAlert({
          isOpen: true,
          icon: FaExclamationTriangle,
          title: "Missing Field",
          // body: `Please fill in the ${key} field`,
          body: `Please fill in the ${key || fieldLabels[key]} field`,
          color: "red",
        });
        return;
      }
    }

    mutate(formData, {
      onSuccess: (res) => {
        const result = res.data.data.prediction;
        // console.log(res.data.data.prediction);
        setAlert({
          isOpen: true,
          icon: result === "Diabetic" ? MdWarning : FaCheckCircle,
          title:
            result === "Diabetic"
              ? "Diabetes Detected"
              : "No Diabetes Detected",
          body:
            result === "Diabetic"
              ? "Please consult a doctor for further advice."
              : "You're in good health! Keep it up!",
          color: result === "Diabetic" ? "red" : "green",
        });
      },
    });
  };

  const section = formSections[currentSection];
  // to right,
  //       #ffffff8f,
  //       #eafaf7cc,
  //       #ffe9d611

  return (
    <div className="max-w-2xl mt-15 mx-auto p-6 shadow bg-gradient-to-b from-[#ffffff8f] via-[#eafaf7cc] to-[#ffe9d611] rounded-lg ">
      <h1
        className="text-3xl font-bold text-center mb-4 text-blue-700 flex justify-center items-center gap-2"
        data-aos="fade-down"
      >
        <FaHeartbeat className="text-blue-600" /> Predict Diabetes
      </h1>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">{section.title}</h3>
        {section.fields.map((key) => (
          <div key={key} className="mb-3">
            <label className="block font-medium">{key}</label>
            <p className="text-sm text-gray-500 mb-1">{fieldLabels[key]}</p>

            {fieldOptions[key] ? (
              <select
                value={formData[key] !== undefined ? formData[key] : ""}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full border p-2 rounded"
              >
                {!formData[key] && (
                  <option value="" disabled>
                    Select {key}
                  </option>
                )}
                {fieldOptions[key].map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={formData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className={`w-full border p-2 rounded ${
                  submitted && formData[key] === "" ? "border-red-500" : ""
                }`}
                placeholder={`Enter value for ${key}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        {currentSection > 0 && (
          <button
            className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-50"
            onClick={() => setCurrentSection(currentSection - 1)}
          >
            Previous
          </button>
          // from-[#fafcfd] via-[#eafaf7] to-[#ffe9d6]
        )}
        {currentSection < formSections.length - 1 ? (
          <button
            className="px-4 py-2 bg-gradient-to-b from-[#3b5998] via-[#3b5998] to-[#192f6a] hover:from-[#fafcfd] hover:via-[#eafaf7] hover:to-[#ffe9d6] text-white hover:text-blue-600 rounded cursor-pointer"
            onClick={() => setCurrentSection(currentSection + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white cursor-pointer hover:bg-green-950 rounded"
            onClick={handleSubmit}
          >
            {isLoading ? "Predicting..." : "Predict"}
          </button>
        )}
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
            <LoadingSpinner text="Prediction process is going on..." />
          </div>
        )}
      </div>
      {alert.isOpen && (
        <AlertBox
          {...alert}
          onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
      {data && <ResultCard result={data.data.data.prediction} />}
    </div>
  );
};

export default PredictionForm;
