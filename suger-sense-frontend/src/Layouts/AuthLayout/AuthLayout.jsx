import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import authImg from "../../assets/auth-bg.png"; // add any diabetes-related or health illustration
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaHeartbeat } from "react-icons/fa";

const AuthLayout = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  useEffect(() => {
    // AOS.init({ duration: 1000 });
  }, []);
  useEffect(() => {
    AOS.refresh();
  }, [location]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left / Right side changes dynamically */}
      <div
        data-aos="fade-right"
        className={`flex-1 flex flex-col justify-center items-center p-10 ${
          isLogin ? "order-1 md:order-none" : "md:order-2"
        }`}
      >
        {/* <img
          src={authImg}
          alt="Auth Illustration"
          className="w-3/4 max-w-sm animate-fadeIn"
        /> */}
        
        <div className="flex flex-col items-center">
          <FaHeartbeat className="text-6xl text-indigo-600" />
          <h2 className="text-2xl font-bold mt-4 text-indigo-700">
            SugerSense
          </h2>
          <p className="text-gray-600 mt-2 text-center max-w-sm">
            AI-powered diabetes prediction and prevention.
          </p>
        </div>
        <h2 className="text-2xl font-bold mt-6 text-indigo-700">
          SugerSense - Your Diabetes Assistant
        </h2>
        <p className="text-gray-600 mt-3 text-center">
          {isLogin
            ? "Welcome back! Manage your health and track your predictions easily."
            : "Join SugerSense today and take control of your health journey."}
        </p>
      </div>

      {/* Login/Register Form Area */}
      <div
        data-aos="fade-left"
        className={`flex-1 flex justify-center items-center bg-white shadow-xl p-8 ${
          isLogin ? "order-2 md:order-none" : "md:order-1"
        }`}
      >
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
