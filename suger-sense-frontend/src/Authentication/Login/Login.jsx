import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import SugerSenseLogoIcon from "../../Shared/SugerSenseLogoIcon/SugerSenseLogoIcon";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  

  const onSubmit = (data) => {
    console.log("Login Data:", data);
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
        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className="w-full border rounded-md p-3 focus:ring-2 focus:ring-indigo-500"
        />
        {errors.password && <p className="text-red-500 text-sm">Password is required</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>

      <div className="text-center">
        <p className="text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>

      <div className="divider text-gray-400 text-sm text-center my-2">OR</div>

      <button
        className="w-full flex items-center justify-center gap-2 border border-gray-300 p-3 rounded-md hover:bg-gray-100 transition"
      >
        <FaGoogle className="text-red-500" /> Continue with Google
      </button>
    </div>
  );
};

export default Login;
