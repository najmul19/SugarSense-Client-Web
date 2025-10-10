import React from "react";
import { Droplet, Facebook, Linkedin, Youtube } from "lucide-react";
import SugerSenseLogoIcon from "../SugerSenseLogoIcon/SugerSenseLogoIcon";
import { Link } from "react-router-dom";
import {
  FaCode,
  FaFacebook,
  FaGit,
  FaGithub,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding Section */}
        <div className="text-center md:text-left">
          {/* <SugerSenseLogoIcon></SugerSenseLogoIcon> */}
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
          <p className="text-gray-400 mt-1 text-sm">
            © {new Date().getFullYear()} Diabetes Prediction System
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-300 text-center">
          <Link to="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <Link to="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link
            to="/feedback"
            className="bg-gradient-to-b from-[#fafcfd] via-[#eafaf7] to-[#ffe9d6] hover:from-[#4c669f] hover:via-[#3b5998] hover:to-[#192f6a] text-blue-600 hover:text-white px-3 py-1 rounded-md transition-colors"
          >
            Feedback
          </Link>
        </div>

        {/* Social Media */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="https://www.linkedin.com/in/najmul-islam80b158263/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaLinkedinIn size={20} />
          </a>
          {/* <FaLinkedinIn */}
          {/* <FaGithub */}
          <a
            href="https://najmul19.github.io/md-najmul-islam-portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaCode size={20} />
          </a>
          {/* <FaGit></FaGit> */}

          <a
            href="https://github.com/najmul19"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.facebook.com/md.najmul.islam.138619"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <FaFacebook size={20} />
          </a>
          {/* <FaFacebook */}

          <a
            href="https://www.youtube.com/@coddingplusplus"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors"
          >
            <FaYoutube size={20} />
          </a>
        </div>
      </div>

      {/* Developer Info */}
      <div className="text-center text-gray-500 text-xs mt-4 pb-4">
        Developed by <span className="font-semibold">Md. Najmul Islam</span>,
        Department of CSE, Leading University, Sylhet
      </div>
    </footer>
  );
};

export default Footer;
