import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = axiosInstance();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        //console.log.log(res.user);
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then(() => {
          //console.log.log(res.data);
          navigate("/");
        });
      })
      .catch(() => {
        //console.log.log(e.meassage);
      });
  };
  return (
    <div>
      <div className="p-8">
        <div className="divider"></div>
        <button onClick={handleGoogleSignIn} className="btn">
          <FaGoogle className="mr-2"></FaGoogle>
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;