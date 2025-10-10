import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUserShield } from "react-icons/fa";

const PrivacyPolicy = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div
        className="shadow rounded-2xl p-10 md:p-12 max-w-4xl card-bg-n w-full text-center"
        data-aos="zoom-in"
      >
        <h1
          className="text-3xl font-bold text-center mb-4 text-blue-700 flex justify-center items-center gap-2"
        data-aos="fade-down"
        >
            <FaUserShield className="text-2xl text-blue-600"></FaUserShield>
          Privacy Policy
        </h1>

        <p className="text-gray-500 mb-8 text-sm" data-aos="fade-up">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        <p className="mb-6 text-gray-700 leading-relaxed" data-aos="fade-up">
          <strong>SugarSense</strong> is dedicated to protecting your privacy.
          This Privacy Policy explains how we handle and safeguard your
          information when you use our AI-powered Diabetes Prediction System.
        </p>

        <section className="space-y-8">
          <div data-aos="fade-up">
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may collect information that you provide, such as your name,
              email, and health-related data (glucose level, BMI, blood
              pressure, age, and insulin). This information helps our AI model
              analyze and predict diabetes risk more effectively.
            </p>
          </div>

          <div data-aos="fade-up">
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">
              2. Purpose of Data Collection
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The collected data is used only for educational and
              prediction-based purposes. We do not sell, rent, or share your
              information with unauthorized parties.
            </p>
          </div>

          <div data-aos="fade-up">
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">
              3. AI Assistant Conversations
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The SugarSense AI Assistant offers health-related guidance and
              diabetes prevention tips. It does not store chat history
              permanently or request sensitive personal data. Always consult a
              licensed medical professional for real diagnosis or treatment.
            </p>
          </div>

          <div data-aos="fade-up">
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">
              4. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your privacy and data safety are our top priorities. SugarSense
              uses <strong>JWT (JSON Web Token)</strong> based authentication and
              authorization to ensure each user’s data is completely private.
              This means no one can access another person’s data — even through
              direct API calls or form URLs — without a valid and verified token.
              All interactions and requests are securely validated before
              processing.
            </p>
          </div>

          <div data-aos="fade-up">
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">
              5. User Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to request access, correction, or deletion of
              your information (prediction history) at any time. To do so,
              contact us using the email address provided below.
            </p>
          </div>

          <div data-aos="fade-up">
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">
              6. Updates to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page with an updated date.
            </p>
          </div>

          <div data-aos="fade-up">
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">
              7. Disclaimer
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The diabetes predictions provided by <strong>SugarSense</strong>{" "}
              are AI-generated and meant for awareness and early assessment
              only. While the model is trained on real-world data, predictions
              may not be perfect. Always confirm important results with medical
              tests and professional healthcare advice.
            </p>
          </div>

          <div data-aos="fade-up">
            <h2 className="text-2xl font-semibold text-blue-500 mb-2">
              8. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed">
              For questions or privacy-related concerns, please contact:
              <br />
              <strong>Md. Najmul Islam</strong>
              <br />
              Department of CSE, Leading University, Sylhet
              <br />
              Email:{" "}
              <a
                href="mailto:mdnajmulislam10992@gmail.com"
                className="text-blue-600 underline"
              >
                mdnajmulislam10992@gmail.com
              </a>
            </p>
          </div>
        </section>

        <hr className="my-10 border-gray-200" data-aos="fade-up" />

        <p className="text-gray-500 text-sm text-center" data-aos="fade-up">
          © {new Date().getFullYear()} <strong>SugarSense</strong>. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
