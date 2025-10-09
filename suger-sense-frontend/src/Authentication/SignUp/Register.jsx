import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SugerSenseLogoIcon from "../../Shared/SugerSenseLogoIcon/SugerSenseLogoIcon";
import axiosInstance from "../../api/axiosInstance";
import useAuth from "../../api/Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocilaLogin";
import { useState } from "react";
import { MdError } from "react-icons/md";
import AlertBox from "../../components/AlertBox";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const [alert, setAlert] = useState({
    isOpen: false,
    icon: FaGoogle,
    title: "",
    body: "",
    color: "green",
  });
  const password = watch("password");
  const axiosPublic = axiosInstance;
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useAuth();
  const onSubmit = (data) => {
    // console.log(data);
    // console.log(createUser);
    createUser(data.email, data.password)
      .then(() => {
        // const loggedUse = res.user;
        updateUserProfile(data.name)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              // photoURL: data.photoURL,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                axiosPublic.post("/jwt", { email: data.email }).then((res) => {
                  localStorage.setItem("access-token", res.data.token);
                });
                reset();

                setAlert({
                  isOpen: true,
                  icon: FaGoogle,
                  title: "Register Successful!",
                  body: `Welcome ${userInfo?.name} back!  Redirecting...`,
                  color: "green",
                });

                setTimeout(() => {
                  setAlert((prev) => ({ ...prev, isOpen: false }));
                  navigate(from, { replace: true });
                }, 2000);
              }
            });
          })
          .catch((error) => {
            // console.log(error)
            setAlert({
              isOpen: true,
              icon: MdError,
              title: error.message,
              body: "Something went wrong. Please try again.",
              color: "red",
            });
            
          });
      })
      .catch((error) => {
        setAlert({
          isOpen: true,
          icon: MdError,
          title: "Register Failed",
          body: `Something went wrong. ${error.message} Please try again.`,
          color: "red",
        });
      });
  };

  return (
    <div data-aos="zoom-out" className="space-y-5">
      <SugerSenseLogoIcon></SugerSenseLogoIcon>
      <h2 className="text-3xl font-bold text-indigo-700 text-center">
        Create Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-md p-3 focus:ring-2 focus:ring-indigo-500"
        />

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
          {...register("password", { required: true, minLength: 6 })}
          type="password"
          placeholder="Password"
          className="w-full border rounded-md p-3 focus:ring-2 focus:ring-indigo-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">
            Password must be at least 6 characters
          </p>
        )}

        <input
          {...register("confirm", {
            required: true,
            validate: (value) => value === password || "Passwords do not match",
          })}
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded-md p-3 focus:ring-2 focus:ring-indigo-500"
        />
        {errors.confirm && (
          <p className="text-red-500 text-sm">{errors.confirm.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-b from-[#3b5998] via-[#3b5998] to-[#192f6a] hover:from-[#fafcfd] hover:via-[#eafaf7] hover:to-[#ffe9d6] text-white hover:text-blue-600 cursor-pointer p-3 rounded-md font-semibold hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>
      </form>

      <div className="text-center">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      <div className="divider text-gray-400 text-sm text-center my-2">OR</div>

      {/* <button className="w-full flex items-center justify-center gap-2 border cursor-pointer border-gray-300 p-3 rounded-md hover:bg-gray-100 transition">
        <FaGoogle className="text-red-500" /> Continue with Google
      </button> */}
      <SocialLogin></SocialLogin>
       <AlertBox
        {...alert}
        onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default Register;
