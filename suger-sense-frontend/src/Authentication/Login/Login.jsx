import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SugerSenseLogoIcon from "../../Shared/SugerSenseLogoIcon/SugerSenseLogoIcon";
import Swal from "sweetalert2";
import useAuth from "../../api/Hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";
import SocialLogin from "../SocialLogin/SocilaLogin";
import { useState } from "react";
import AlertBox from "../../components/AlertBox";
import { MdError } from "react-icons/md";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosPublic = axiosInstance;
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const [alert, setAlert] = useState({
    isOpen: false,
    icon: FaGoogle,
    title: "",
    body: "",
    color: "green",
  });
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;

        axiosPublic.post("/jwt", { email: user.email }).then((res) => {
          localStorage.setItem("access-token", res.data.token);
          // Swal.fire({
          //   title: "Login Successful!",
          //   icon: "success",
          //   confirmButtonColor: "green",
          // });
          setAlert({
            isOpen: true,
            icon: FaGoogle,
            title: "Login Successful!",
            body: `Welcome back ! Redirecting...`,
            color: "green",
          });

          setTimeout(() => {
            setAlert((prev) => ({ ...prev, isOpen: false }));
            navigate(from, { replace: true });
          }, 2000);
        });
      })
      .catch((error) => {
        setAlert({
          isOpen: true,
          icon: MdError,
          title: "Login Failed",
          body: `Something went wrong. ${error.message} Please try again.`,
          color: "red",
        });
      });
  };

  return (
    <div data-aos="zoom-in" className=" space-y-5">
      <SugerSenseLogoIcon></SugerSenseLogoIcon>
      <h2 className="text-3xl font-bold text-indigo-700 text-center">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="w-full border rounded-md p-3 focus:ring-2 focus:ring-indigo-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">Email is required</p>
        )}

        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className="w-full border rounded-md p-3 focus:ring-2 focus:ring-indigo-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">Password is required</p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-b from-[#3b5998] via-[#3b5998] to-[#192f6a] hover:from-[#fafcfd] hover:via-[#eafaf7] hover:to-[#ffe9d6] text-white hover:text-blue-600 cursor-pointer p-3 rounded-md font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>

      <div className="text-center">
        <p className="text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      <div className="divider text-gray-400 text-sm text-center my-2">OR</div>

      <SocialLogin></SocialLogin>
      <AlertBox
        {...alert}
        onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default Login;
