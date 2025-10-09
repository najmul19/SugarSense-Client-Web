import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../api/Hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";
import AlertBox from "../../components/AlertBox";


const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = axiosInstance;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [alert, setAlert] = useState({
    isOpen: false,
    icon: FaGoogle,
    title: "",
    body: "",
    color: "green",
  });

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
        };

        axiosPublic.post("/users", userInfo).then(() => {
          axiosPublic.post("/jwt", { email: userInfo.email }).then((res) => {
            localStorage.setItem("access-token", res.data.token);

      
            setAlert({
              isOpen: true,
              icon: FaGoogle,
              title: "Login Successful!",
              body: `Welcome back, ${userInfo.name}! Redirecting...`,
              color: "green",
            });

            setTimeout(() => {
              setAlert((prev) => ({ ...prev, isOpen: false }));
              navigate(from, { replace: true });
            }, 2000);
          });
        });
      })
      .catch(() => {
        setAlert({
          isOpen: true,
          icon: FaGoogle,
          title: "Login Failed",
          body: "Something went wrong. Please try again.",
          color: "red",
        });
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 border cursor-pointer border-gray-300 p-3 rounded-md hover:bg-gray-100 transition"
      >
        <FaGoogle className="text-red-500" />
        Google
      </button>

 
      {alert.isOpen && (
        <AlertBox
          {...alert}
          onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
    </div>
  );
};

export default SocialLogin;
