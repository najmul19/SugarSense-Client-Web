import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaBrain,
  FaChartLine,
  FaShieldAlt,
  FaHistory,
  FaUserCircle,
} from "react-icons/fa";
import GradientButton from "../../../Shared/Buttons/GradientButton";
import useAuth from "../../../api/Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../api/Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Shared/LoadingSpinner";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: myData, isLoading } = useQuery({
    queryKey: ["user-data", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  if (isLoading) {
    <LoadingSpinner text="Loading Home content"></LoadingSpinner>;
  }

  return (
    <div className="text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section
        className="text-center py-10 card-bg-secondary"
        data-aos="fade-down"
      >
        {user ? (
          <h1 className="flex items-center justify-center gap-2 text-xl font-semibold text-[#f1f5f9] px-4 pb-3 rounded-lg">
            <FaUserCircle className="text-[#b0d4ff] text-2xl" />
            Welcome, <span className="text-[#dbeafe]">{myData?.name}</span>
          </h1>
        ) : (
          <h1 className="flex items-center justify-center gap-2 text-gray-300 italic px-4 py-2">
            <FaUserCircle className="text-gray-400 text-xl" />
            Welcome, Guest
          </h1>
        )}

        <h1 className="text-4xl font-bold mb-4" data-aos="zoom-in">
          Predict Your Diabetes Risk in Seconds
        </h1>
        <p className="text-lg mb-6" data-aos="fade-up">
          AI-powered health insights that help you take early action for a
          healthier future.
        </p>
        <Link to="/predict" data-aos="zoom-in" data-aos-delay="200">
          <GradientButton text="Get Started" />
        </Link>
      </section>

      {/* About Section */}
      <section
        className="py-16 px-6 max-w-4xl mx-auto text-center"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-semibold mb-4">About SugarSense</h2>
        <p>
          SugarSense is a smart diabetes prediction system that uses machine
          learning to analyze your health indicators and assess your risk level.
          Our goal is to make early diagnosis easier, faster, and more accurate
          — empowering users to make informed health decisions.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-16" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
          {[
            {
              title: "1. Enter Your Health Info",
              desc: "Provide a few key details like age, BMI, and blood pressure.",
            },
            {
              title: "2. AI Analyzes Your Data",
              desc: "Our model predicts your diabetes risk in real time.",
            },
            {
              title: "3. Get Instant Results",
              desc: "View your risk level and personalized suggestions instantly.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="card-bg p-6 rounded-xl shadow hover:shadow-lg transition"
              data-aos="flip-left"
              data-aos-delay={i * 150}
            >
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Key Features
        </h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <FaBrain size={30} />,
              title: "Accurate Predictions",
              desc: "Powered by advanced AI models.",
            },
            {
              icon: <FaShieldAlt size={30} />,
              title: "Data Security",
              desc: "Your health data is safe with us.",
            },
            {
              icon: <FaHistory size={30} />,
              title: "Prediction History",
              desc: "Track all your past predictions easily.",
            },
            {
              icon: <FaChartLine size={30} />,
              title: "Admin Dashboard",
              desc: "Get powerful insights and analytics.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="text-center card-bg p-6 rounded-xl shadow hover:shadow-lg transition"
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              <div className="text-blue-600 mb-3 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
              <p className="text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Educational Tips */}
      <section className="py-16 px-6 text-center" data-aos="fade-up">
        <div className="max-w-3xl mx-auto space-y-3 text-gray-700 shadow rounded-2xl bg-amber-50 py-5">
          <h2 className="text-3xl font-semibold mb-6" data-aos="fade-down">
            Tips to Prevent Diabetes
          </h2>
          <div
            className="space-y-1 pb-2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <p>
              • Maintain a balanced diet rich in vegetables and whole grains.
            </p>
            <p>• Exercise regularly to control blood sugar levels.</p>
            <p>• Avoid smoking and excessive alcohol consumption.</p>
            <p>• Schedule regular health checkups.</p>
          </div>
          <Link to="diabetesEdu">
            <button
              className="bg-gradient-to-b from-[#3b5998] via-[#3b5998] to-[#192f6a] 
               hover:from-[#fafcfd] hover:via-[#eafaf7] hover:to-[#ffe9d6]
               text-white hover:text-blue-600
               py-2 px-4 rounded-md
               transition duration-300 ease-in-out cursor-pointer"
            >
              Learn More
            </button>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-20 text-center card-bg-secondary text-white"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-semibold mb-4">
          Ready to Check Your Diabetes Risk?
        </h2>
        <p className="mb-6">
          It only takes a minute to get your personalized prediction.
        </p>
        <Link to="/predict" data-aos="zoom-in" data-aos-delay="150">
          <GradientButton text="Predict Now" />
        </Link>
      </section>

      {/* feeadback section */}

      <section className="py-16 px-6  text-center" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">Feedback</h2>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          {/* All Feedback */}
          <Link to="/allFeedback">
            <button className="bg-gradient-to-b from-[#3b5998] via-[#3b5998] to-[#192f6a] 
               hover:from-[#fafcfd] hover:via-[#eafaf7] hover:to-[#ffe9d6]
               text-white hover:text-blue-600 px-6 py-3 rounded-md transition cursor-pointer">
              View All Feedback
            </button>
          </Link>

          {/* My Feedback */}
          {myData?.role != "admin" ? (
            <Link to="/myFeedback">
              <button className=" bg-gradient-to-b from-[#3b9890] via-[#296574f1] to-[#196a69] 
               hover:from-[#fafcfd] hover:via-[#eafaf7] hover:to-[#ffe9d6]
                hover:text-blue-600 text-white px-6 py-3 rounded-md transition cursor-pointer">
                My Feedback
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
