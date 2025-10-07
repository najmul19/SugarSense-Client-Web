import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SugerSenseLogoIcon from "../../Shared/SugerSenseLogoIcon/SugerSenseLogoIcon";
import axiosInstance from "../../api/axiosInstance";
import useAuth from "../../api/Hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
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
                reset();
                Swal.fire({
                  title: "Welcome to KhabarKuri!",
                  text: "Account created successfully",
                  icon: "success",
                  background: "white",
                  color: "black",
                  confirmButtonColor: "green",
                });
                navigate("/");
              }
            });
          })
          .catch((error) => {
            // console.log(error)
            Swal.fire({
              title: "Error",
              text: error.message,
              icon: "error",
              background: "white",
              color: "black",
              confirmButtonColor: "red",
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          title: "Sign Up Failed",
          text: error.message,
          icon: "error",
          background: "white",
          color: "black",
          confirmButtonColor: "red",
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
          className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>
      </form>

      <div className="text-center">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      <div className="divider text-gray-400 text-sm text-center my-2">OR</div>

      <button className="w-full flex items-center justify-center gap-2 border border-gray-300 p-3 rounded-md hover:bg-gray-100 transition">
        <FaGoogle className="text-red-500" /> Continue with Google
      </button>
    </div>
  );
};

export default Register;
