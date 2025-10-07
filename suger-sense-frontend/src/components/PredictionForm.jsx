import { useState } from "react";
import { usePrediction } from "../api/Hooks/usePrediction";
import ResultCard from "./ResultCard";

const formSections = [
  { title: "Personal Information", fields: ["Age", "Sex", "Income", "Education"] },
  { title: "Health Metrics", fields: ["BMI", "GenHlth", "HighBP", "HighChol", "CholCheck"] },
  { title: "Lifestyle Factors", fields: ["PhysActivity", "HvyAlcoholConsump", "Smoker", "Veggies", "Fruits"] },
  { title: "Medical History", fields: ["HeartDiseaseorAttack", "Stroke", "DiffWalk", "AnyHealthcare"] },
];

const fieldLabels = {
  GenHlth: "General Health (1=Excellent, 5=Poor)",
  HighBP: "High Blood Pressure (0=No, 1=Yes)",
  BMI: "Body Mass Index",
  Age: "Age Category",
  HighChol: "High Cholesterol (0=No, 1=Yes)",
  CholCheck: "Cholesterol Check in 5 Years (0=No, 1=Yes)",
  Income: "Income Level",
  Sex: "Biological Sex (0=Female, 1=Male)",
  HeartDiseaseorAttack: "Heart Disease or Attack (0=No, 1=Yes)",
  HvyAlcoholConsump: "Heavy Alcohol Consumption (0=No, 1=Yes)",
  AnyHealthcare: "Any Healthcare Coverage (0=No, 1=Yes)",
  DiffWalk: "Difficulty Walking (0=No, 1=Yes)",
  PhysActivity: "Physical Activity (0=No, 1=Yes)",
  Smoker: "Smoker (0=No, 1=Yes)",
  Veggies: "Consume Vegetables Daily (0=No, 1=Yes)",
  Fruits: "Consume Fruits Daily (0=No, 1=Yes)",
  Education: "Education Level",
  Stroke: "Ever Had Stroke (0=No, 1=Yes)"
};

const fieldOptions = {
  Age: [
    { label: "18-24", value: 1 }, { label: "25-29", value: 2 }, { label: "30-34", value: 3 },
    { label: "35-39", value: 4 }, { label: "40-44", value: 5 }, { label: "45-49", value: 6 },
    { label: "50-54", value: 7 }, { label: "55-59", value: 8 }, { label: "60-64", value: 9 },
    { label: "65-69", value: 10 }, { label: "70-74", value: 11 }, { label: "75-79", value: 12 }, { label: "80+", value: 13 }
  ],
  Education: [
    { label: "No School", value: 1 }, { label: "Elementary", value: 2 }, { label: "Some High School", value: 3 },
    { label: "High School Graduate", value: 4 }, { label: "Some College", value: 5 }, { label: "College Graduate", value: 6 }
  ],
  Income: [
    { label: "Less than $10,000", value: 1 }, { label: "$10,000 - $15,000", value: 2 }, { label: "$15,000 - $20,000", value: 3 },
    { label: "$20,000 - $25,000", value: 4 }, { label: "$25,000 - $35,000", value: 5 }, { label: "$35,000 - $50,000", value: 6 },
    { label: "$50,000 - $75,000", value: 7 }, { label: "$75,000 or more", value: 8 }
  ]
};

const PredictionForm = () => {
  const initialForm = Object.keys(fieldLabels).reduce((acc, key) => ({ ...acc, [key]: "" }), {});
  const [formData, setFormData] = useState(initialForm);
  const [currentSection, setCurrentSection] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { mutate, data, isLoading } = usePrediction();

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: key === "BMI" ? value.toString().replace(/[^0-9.]/g, "") : Number(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Validate all fields
    for (const key in formData) {
      if (formData[key] === "") {
        alert(`Please fill in the ${key} field`);
        return;
      }
    }

    mutate(formData);
  };

  const section = formSections[currentSection];

  return (
    <div className="max-w-2xl mx-auto p-6  rounded-lg shadow ">
      <h2 className="text-2xl font-bold mb-4 text-center">Predict Diabetes</h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">{section.title}</h3>
        {section.fields.map((key) => (
          <div key={key} className="mb-3">
            <label className="block font-medium">{key}</label>
            <p className="text-sm text-gray-500 mb-1">{fieldLabels[key]}</p>

            {fieldOptions[key] ? (
              <select
                value={formData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select {key}</option>
                {fieldOptions[key].map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={formData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className={`w-full border p-2 rounded ${submitted && formData[key] === "" ? "border-red-500" : ""}`}
                placeholder={`Enter value for ${key}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        {currentSection > 0 && (
          <button className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-50" onClick={() => setCurrentSection(currentSection - 1)}>Previous</button>
          // from-[#fafcfd] via-[#eafaf7] to-[#ffe9d6]
        )}
        {currentSection < formSections.length - 1 ? (
          <button className="px-4 py-2 bg-gradient-to-b from-[#3b5998] via-[#3b5998] to-[#192f6a] hover:from-[#fafcfd] hover:via-[#eafaf7] hover:to-[#ffe9d6] text-white hover:text-blue-600 rounded cursor-pointer" onClick={() => setCurrentSection(currentSection + 1)}>Next</button>
        ) : (
          <button className="px-4 py-2 bg-green-500 text-white cursor-pointer hover:bg-green-950 rounded" onClick={handleSubmit}>
            {isLoading ? "Predicting..." : "Predict"}
          </button>
        )}
      </div>

      {data && <ResultCard result={data.data.prediction} />}
    </div>
  );
};

export default PredictionForm;
