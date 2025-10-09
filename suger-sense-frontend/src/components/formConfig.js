export const formSections = [
  {
    title: "Personal Information",
    fields: ["Age", "Sex", "Income", "Education"],
  },
  {
    title: "Health Metrics",
    fields: ["BMI", "GenHlth", "HighBP", "HighChol", "CholCheck"],
  },
  {
    title: "Lifestyle Factors",
    fields: [
      "PhysActivity",
      "HvyAlcoholConsump",
      "Smoker",
      "Veggies",
      "Fruits",
    ],
  },
  {
    title: "Medical History",
    fields: ["HeartDiseaseorAttack", "Stroke", "DiffWalk", "AnyHealthcare"],
  },
];

export const fieldLabels = {
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
  Stroke: "Ever Had Stroke (0=No, 1=Yes)",
};

export const fieldOptions = {
  Age: [
    { label: "18-24", value: 1 },
    { label: "25-29", value: 2 },
    { label: "30-34", value: 3 },
    { label: "35-39", value: 4 },
    { label: "40-44", value: 5 },
    { label: "45-49", value: 6 },
    { label: "50-54", value: 7 },
    { label: "55-59", value: 8 },
    { label: "60-64", value: 9 },
    { label: "65-69", value: 10 },
    { label: "70-74", value: 11 },
    { label: "75-79", value: 12 },
    { label: "80+", value: 13 },
  ],
  Education: [
    { label: "No School", value: 1 },
    { label: "Elementary", value: 2 },
    { label: "Some High School", value: 3 },
    { label: "High School Graduate", value: 4 },
    { label: "Some College", value: 5 },
    { label: "College Graduate", value: 6 },
  ],
  Income: [
    { label: "Less than $10,000", value: 1 },
    { label: "$10,000 - $15,000", value: 2 },
    { label: "$15,000 - $20,000", value: 3 },
    { label: "$20,000 - $25,000", value: 4 },
    { label: "$25,000 - $35,000", value: 5 },
    { label: "$35,000 - $50,000", value: 6 },
    { label: "$50,000 - $75,000", value: 7 },
    { label: "$75,000 or more", value: 8 },
  ],

  //0 or 1
  HighBP: [
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ],
  HighChol: [
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ],
  CholCheck: [
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ],
  Sex: [
    { label: "Female", value: 0 },
    { label: "Male", value: 1 },
  ],
  HeartDiseaseorAttack: [
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ],
  HvyAlcoholConsump: [
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ],
  AnyHealthcare: [
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ],
  DiffWalk: [
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ],
  PhysActivity: [
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ],
  Smoker: [
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ],
  Veggies: [
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ],
  Fruits: [
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ],
  Stroke: [
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ],
  GenHlth: [
    { label: "Excellent", value: 1 },
    { label: "Very Good", value: 2 },
    { label: "Good", value: 3 },
    { label: "Fair", value: 4 },
    { label: "Poor", value: 5 },
  ],
};
