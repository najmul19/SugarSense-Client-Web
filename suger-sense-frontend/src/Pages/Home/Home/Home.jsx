import { Link } from "react-router-dom";
import { FaBrain, FaChartLine, FaShieldAlt, FaHistory } from "react-icons/fa";
import GradientButton from "../../../Shared/Buttons/GradientButton";

const Home = () => {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 card-bg-secondary">
        <h1 className="text-4xl font-bold mb-4">
          Predict Your Diabetes Risk in Seconds
        </h1>
        <p className="text-lg mb-6">
          AI-powered health insights that help you take early action for a
          healthier future.
        </p>
        <Link to="/predict">
          <GradientButton text="Get Started"></GradientButton>
        </Link>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">About SugarSense</h2>
        <p className="">
          SugarSense is a smart diabetes prediction system that uses machine
          learning to analyze your health indicators and assess your risk level.
          Our goal is to make early diagnosis easier, faster, and more accurate
          — empowering users to make informed health decisions.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-16 ">
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
            >
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 ">
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
            >
              <div className="text-blue-600 mb-3 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
              <p className="  text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Educational Tips */}
      <section className="py-16 px-6  text-center">
        <div className="max-w-3xl mx-auto  space-y-3 text-gray-700 shadow rounded-2xl bg-amber-50 py-5">
          <h2 className="text-3xl font-semibold mb-6">
            Tips to Prevent Diabetes
          </h2>
          <div className="">
            <p>
              • Maintain a balanced diet rich in vegetables and whole grains.
            </p>
            <p>• Exercise regularly to control blood sugar levels.</p>
            <p>• Avoid smoking and excessive alcohol consumption.</p>
            <p>• Schedule regular health checkups.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center card-bg-secondary text-white">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to Check Your Diabetes Risk?
        </h2>
        <p className="mb-6">
          It only takes a minute to get your personalized prediction.
        </p>
        <Link to="/predict">
          <GradientButton text="Predict Now"></GradientButton>
        </Link>
      </section>
    </div>
  );
};

export default Home;
