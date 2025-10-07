import { Link, NavLink } from "react-router-dom";
import SugerSenseLogoIcon from "../SugerSenseLogoIcon/SugerSenseLogoIcon";
import useAuth from "../../api/Hooks/useAuth";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../api/Hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myData, refetch } = useQuery({
    queryKey: ["user-data", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out");
        refetch();
      })
      .catch((error) => console.error(error));
  };
  return (
    <header className="sticky z-40 top-0 bg-gradient-to-r from-[#4c669f] via-[#3b5998] to-[#192f6a] text-white py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* <h1 className="text-xl font-bold">SugerSense</h1> */}
        <SugerSenseLogoIcon></SugerSenseLogoIcon>
        <nav className="flex space-x-4 ">
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
          {user ? (
            <>
              <h1>{myData?.name || user.email}</h1>
              <button onClick={handleLogout}>LogOut</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
