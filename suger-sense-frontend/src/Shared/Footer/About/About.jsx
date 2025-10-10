import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaRobot, FaHeartbeat, FaUsers, FaLightbulb, FaInfoCircle } from "react-icons/fa";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className=" text-gray-800 px-6 py-12 md:px-20"
      data-aos="fade-up"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1
          className="text-3xl font-bold text-center mb-4 text-blue-700 flex justify-center items-center gap-2"
          data-aos="fade-down"
        >
            <FaInfoCircle className="text-2xl text-blue-600"></FaInfoCircle>
          About SugarSense
        </h1>
        <p className="text-center text-gray-600 mb-10" data-aos="fade-up">
          AI-powered Diabetes Prediction System built to support humanity
          through technology.
        </p>

        <section className="mb-10" data-aos="fade-up">
          <p className="text-justify leading-relaxed text-gray-700">
            <strong>SugarSense</strong> is an AI-powered Diabetes Prediction
            System developed with a vision to support humanity through
            technology. It was created to address the growing global concern of
            diabetes — a disease often diagnosed late due to lack of awareness
            and limited medical access. SugarSense uses intelligent machine
            learning models to help individuals understand their diabetes risk
            early and take preventive action.
          </p>
        </section>

       
        <section className="grid md:grid-cols-2 gap-6 mb-12">
          <div
            className="p-6 card-bg-n shadow-md rounded-2xl hover:shadow-lg transition"
            data-aos="fade-right"
          >
            <FaRobot className="text-3xl text-blue-600 mb-3" />
            <h2 className="font-semibold text-lg mb-2">
              AI-Powered Prediction
            </h2>
            <p className="text-gray-700">
              Analyzes key medical attributes such as glucose, BMI, age,
              insulin, and blood pressure using machine learning for accurate
              and reliable diabetes predictions.
            </p>
          </div>

          <div
            className="p-6 card-bg-n shadow-md rounded-2xl hover:shadow-lg transition"
            data-aos="fade-left"
          >
            <FaHeartbeat className="text-3xl text-red-500 mb-3" />
            <h2 className="font-semibold text-lg mb-2">
              24/7 Health Assistant
            </h2>
            <p className="text-gray-700">
              Interactive AI chatbot that provides health-related answers,
              prevention tips, and lifestyle guidance anytime, anywhere.
            </p>
          </div>

          <div
            className="p-6 card-bg-n shadow-md rounded-2xl hover:shadow-lg transition"
            data-aos="fade-right"
          >
            <FaLightbulb className="text-3xl text-yellow-500 mb-3" />
            <h2 className="font-semibold text-lg mb-2">
              Education & Awareness
            </h2>
            <p className="text-gray-700">
              Offers a Diabetes Education Section that shares vital health tips
              and preventive information to encourage healthier living through
              awareness.
            </p>
          </div>

          <div
            className="p-6 card-bg-n shadow-md rounded-2xl hover:shadow-lg transition"
            data-aos="fade-left"
          >
            <FaUsers className="text-3xl text-green-600 mb-3" />
            <h2 className="font-semibold text-lg mb-2">
              Feature Visualization
            </h2>
            <p className="text-gray-700">
              Provides doctors and researchers with feature importance insights,
              showing which medical factors most impact diabetes prediction.
            </p>
          </div>
        </section>

       
        <section className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Developer
          </h2>

          <div className="flex flex-col items-center" data-aos="zoom-in">
            <img
              src="https://i.ibb.co.com/vC0VGDcp/a-studio-portrait-photograph-of-a-confid-Xnm-J2-Pdq-Tu-Oo2-Y8-HHTkmlw-V5s8-Bdvs-RDqb-IFuz-HEEVo-A.jpg"
              alt="Developer"
              className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-blue-200 mb-4"
            />
            <p className="text-gray-700 font-medium text-lg">
              Md. Najmul Islam
            </p>
            <p className="text-gray-600 text-sm">
              Department of Computer Science and Engineering (CSE) <br />
              Leading University, Sylhet
            </p>
          </div>

          <p
            className="mt-6 text-gray-700 leading-relaxed max-w-3xl mx-auto"
            data-aos="fade-up"
          >
            SugarSense was developed as a project to combine compassion with
            computation. Its goal is not only to predict but to educate, assist,
            and save lives by making intelligent and user-friendly AI healthcare
            tools accessible to everyone.
          </p>
        </section>

      
        <section className="mt-10" data-aos="fade-up">
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">
            Real-World Impact
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            In practical use, SugarSense can assist doctors in rural areas,
            support health awareness programs, and help individuals self-assess
            their diabetes risk before visiting a hospital. It demonstrates how
            artificial intelligence can be used not just for automation, but for
            humanity, empathy, and the betterment of life.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
