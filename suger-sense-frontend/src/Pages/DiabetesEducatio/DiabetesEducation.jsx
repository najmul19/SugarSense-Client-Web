import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaRunning,
  FaLeaf,
  FaAppleAlt,
  FaTint,
  FaUserMd,
  FaWeight,
  FaBed,
  FaUtensils,
  FaHeartbeat,
} from "react-icons/fa";
import { GiMeditation, GiSodaCan } from "react-icons/gi";

const DiabetesEducation = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

 const sections = [
  {
    category: "Healthy Lifestyle",
    tips: [
      {
        title: "Exercise Regularly",
        description:
          "Aim for at least 30 minutes of moderate activity most days. Walking, swimming, or cycling all help your body manage insulin.",
        icon: <FaRunning className="text-blue-500 text-4xl mx-auto" />,
        link: "https://www.cdc.gov/diabetes/basics/diabetes.html",
      },
      {
        title: "Manage Stress",
        description:
          "Chronic stress raises blood sugar. Practice yoga, meditation, or deep breathing to stay balanced.",
        icon: <GiMeditation className="text-purple-500 text-4xl mx-auto" />,
        link: "https://www.healthline.com/health/stress-and-diabetes",
      },
      {
        title: "Get Enough Sleep",
        description:
          "Lack of sleep affects hormone balance and insulin sensitivity. Try for 7–8 hours each night.",
        icon: <FaBed className="text-indigo-500 text-4xl mx-auto" />,
        link: "https://www.sleepfoundation.org/diabetes-and-sleep",
      },
    ],
  },
  {
    category: "Diet & Nutrition",
    tips: [
      {
        title: "Choose Whole Foods",
        description:
          "Base your meals on vegetables, legumes, fruits, whole grains, and lean proteins.",
        icon: <FaLeaf className="text-green-500 text-4xl mx-auto" />,
        link: "https://www.diabetes.org/healthy-living/recipes-nutrition",
      },
      {
        title: "Limit Sugary Drinks",
        description:
          "Avoid sodas and fruit juices. Replace them with water, green tea, or sugar-free drinks.",
        icon: <GiSodaCan className="text-red-500 text-4xl mx-auto" />,
        link: "https://www.medicalnewstoday.com/articles/323627",
      },
      {
        title: "Watch Your Portion Sizes",
        description:
          "Eating too much, even healthy food, can raise blood sugar. Learn mindful eating habits.",
        icon: <FaUtensils className="text-orange-500 text-4xl mx-auto" />,
        link: "https://www.niddk.nih.gov/health-information/weight-management/portion-control",
      },
    ],
  },
  {
    category: "Medical Awareness",
    tips: [
      {
        title: "Monitor Blood Sugar",
        description:
          "If you are at risk, track your fasting and post-meal blood sugar levels regularly.",
        icon: <FaTint className="text-red-500 text-4xl mx-auto" />,
        link: "https://www.cdc.gov/diabetes/managing/testing-blood-sugar.html",
      },
      {
        title: "Regular Health Checkups",
        description:
          "Consult your doctor for blood glucose, cholesterol, and blood pressure checks every 6–12 months.",
        icon: <FaUserMd className="text-teal-500 text-4xl mx-auto" />,
        link: "https://www.who.int/news-room/fact-sheets/detail/diabetes",
      },
      {
        title: "Know Your Risk Factors",
        description:
          "Family history, obesity, and sedentary lifestyle increase diabetes risk. Take preventive action early.",
        icon: <FaWeight className="text-yellow-500 text-4xl mx-auto" />,
        link: "https://www.nhs.uk/conditions/diabetes/prevention/",
      },
    ],
  },
];


  return (
    <div className="min-h-scree p-8 md:p-16">
      <h1
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
        data-aos="fade-down"
      >
        Diabetes Prevention & Health Education
      </h1>

      {sections.map((section, index) => (
        <div key={index} className="mb-16" data-aos="fade-up">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
            {section.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {section.tips.map((tip, i) => (
              <div
                key={i}
                className="card-bg rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="text-5xl text-center mb-4">{tip.icon}</div>
                <h3 className="text-xl font-semibold  mb-2 text-center">
                  {tip.title}
                </h3>
                <p className=" text-center mb-3">
                  {tip.description}
                </p>
                {tip.link && (
                  <a
                    href={tip.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 text-sm text-center hover:underline"
                  >
                    Learn More →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <p
        className="mt-12 text-center text-gray-600 max-w-3xl mx-auto"
        data-aos="fade-up"
      >
        Knowledge is the first step toward prevention. These evidence-based tips
        are gathered from trusted sources like the WHO, CDC, and American
        Diabetes Association. Stay informed, stay healthy!
      </p>
    </div>
  );
};

export default DiabetesEducation;
