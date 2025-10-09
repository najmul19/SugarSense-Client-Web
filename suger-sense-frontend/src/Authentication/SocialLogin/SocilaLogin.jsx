import { FaGoogle } from "react-icons/fa";

import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../api/Hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = axiosInstance;
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        //console.log.log(res.user);
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          axiosPublic.post("/jwt", { email: userInfo.email }).then((res) => {
            localStorage.setItem("access-token", res.data.token);
          });
          //console.log.log(res.data);
          navigate("/");
        });
      })
      .catch((e) => {
        //console.log.log(e.meassage);
      });
  };
  return (
    <div>
      <div className="">
        {/* <div className="divider"></div> */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border cursor-pointer border-gray-300 p-3 rounded-md hover:bg-gray-100 transition"
        >
          <FaGoogle className=" text-red-500"></FaGoogle>
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
