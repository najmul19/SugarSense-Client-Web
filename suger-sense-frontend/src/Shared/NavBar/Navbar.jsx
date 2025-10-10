import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import SugerSenseLogoIcon from "../SugerSenseLogoIcon/SugerSenseLogoIcon";
import useAuth from "../../api/Hooks/useAuth";
import useAdmin from "../../api/Hooks/useAdmin";
import LoadingSpinner from "../LoadingSpinner";
import { Droplet } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch(console.error);
  };
  // console.log(isAdmin)
  // if (isAdminLoading) return <LoadingSpinner text="Checking admin access..." />;

  return (
    <header className="sticky top-0 z-40 bg-gray-900 text-gray-100 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}

        {/* bg-gradient-to-b from-[#fafcfd] via-[#eafaf7] to-[#ffe9d6]
                 hover:from-[#4c669f] hover:via-[#3b5998] hover:to-[#192f6a]
                 text-blue-600 hover:text-white */}
        <Link
          to="/"
          className="flex items-center gap-2 group select-none"
          // data-aos="fade-left"
        >
          <div className="bg-gradient-to-b from-[#fafcfd] via-[#eafaf7] to-[#ffe9d6] hover:from-[#4c669f] hover:via-[#3b5998] hover:to-[#192f6a] p-2 rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300">
            <Droplet className="text-blue-600 w-6 h-6 font-bold" />
          </div>

          {/* Text */}
          <h1
            className="text-2xl font-extrabold bg-gradient-to-b from-[#fafcfd] via-[#eafaf7] to-[#ffe9d6]
                 hover:from-[#4c669f] hover:via-[#3b5998] hover:to-[#192f6a] text-transparent bg-clip-text tracking-wide"
          >
            SugerSense
          </h1>
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="lg:hidden text-2xl hover:text-[#192f6a] focus:outline-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`absolute lg:static top-full left-0 w-full lg:w-auto  lg:bg-transparent flex flex-col lg:flex-row items-center lg:space-x-6 space-y-4 lg:space-y-0 py-4 lg:py-0 transition-all duration-300 ease-in-out ${
            menuOpen ? "block bg-gray-800" : "hidden lg:flex"
          }`}
        >
          <Link to="/" className=" hover:text-gray-400 " onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/predict" className="  hover:text-gray-400 " onClick={() => setMenuOpen(false)}>
            Predict
          </Link>

          <Link
            to="/history"
            className="hover:text-gray-400 "
            onClick={() => setMenuOpen(false)}
          >
            History
          </Link>
          <Link
            to="/bmiCalculation"
            className="hover:text-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            BMI Calculator
          </Link>
          <Link
            to="/diabetesEdu"
            className="hover:text-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            DiabetesTips
          </Link>
          <Link
            to="/chatbot"
            className="hover:text-gray-400 "
            onClick={() => setMenuOpen(false)}
          >
            AI Assistent
          </Link>
          <Link
            to="/features"
            className="hover:text-gray-400 "
            onClick={() => setMenuOpen(false)}
          >
            Feature Importance
          </Link>
          {isAdmin ? (
            <Link
              to="/dashboard"
              className="hover:text-gray-400 "
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            ""
          )}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="hover:text-gray-400 cursor-pointer "
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-400 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-gray-400 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
