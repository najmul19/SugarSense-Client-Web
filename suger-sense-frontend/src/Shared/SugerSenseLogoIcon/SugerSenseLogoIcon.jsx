import { Link } from "react-router-dom";
import { Droplet } from "lucide-react";

const SugerSenseLogoIcon = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 group select-none"
      data-aos="fade-right"
    >
      {/* Icon */}
      <div className="bg-gradient-to-tr from-[#3b5998] to-[#4c8bf5] p-2 rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300">
        <Droplet className="text-white w-6 h-6" />
      </div>

      {/* Text */}
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#3b5998] to-[#4c8bf5] text-transparent bg-clip-text tracking-wide">
        SugarSense
      </h1>
    </Link>
  );
};

export default SugerSenseLogoIcon;
