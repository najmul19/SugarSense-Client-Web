import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import SugerSenseLogoIcon from "../SugerSenseLogoIcon/SugerSenseLogoIcon";
import useAuth from "../../api/Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut().then(() => console.log("User logged out")).catch(console.error);
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#4c669f] via-[#3b5998] to-[#192f6a] text-white py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <SugerSenseLogoIcon />

        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`absolute md:static top-full left-0 w-full md:w-auto  md:bg-transparent flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0 py-4 md:py-0 transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <Link to="/" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/predict" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Predict</Link>
          <Link to="/history" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>History</Link>
          <Link to="/bmiCalculation" onClick={() => setMenuOpen(false)}>BMI Calculator</Link>
          <Link to="/diabetesEdu" onClick={() => setMenuOpen(false)}>DiabetesTips</Link>
          <Link to="/dashboard" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/features" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>Feature Importance</Link>
          <Link to="/api-docs" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>API Docs</Link>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="hover:text-gray-200"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
