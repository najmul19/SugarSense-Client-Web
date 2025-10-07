import { Link } from "react-router-dom";
import SugerSenseLogoIcon from "../SugerSenseLogoIcon/SugerSenseLogoIcon";

const Navbar = () => {
  return (
    <header className="bg-blue-600 text-white py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        
        {/* <h1 className="text-xl font-bold">SugerSense</h1> */}
        <SugerSenseLogoIcon></SugerSenseLogoIcon>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/predict" className="hover:text-gray-200">
            Predict
          </Link>
          <Link to="/history" className="hover:text-gray-200">
            History
          </Link>
          <Link to="/dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>
          <Link to="/features" className="hover:text-gray-200">
            Feature Importance
          </Link>
          <Link to="/api-docs" className="hover:text-gray-200">
            API Docs
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
