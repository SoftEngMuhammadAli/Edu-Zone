import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import registerSideImage from "../../assets/images/auth/signup-side-image.png";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    if (!userData) {
      console.error("Form data is empty");
      return;
    }

    if (!userData.name || !userData.email || !userData.password) {
      console.error("All fields are required");
      return;
    }

    const res = await dispatch(register(userData));
    if (res.meta.requestStatus === "fulfilled" && res.payload?.user) {
      navigate("/home");
    }
    form.reset();
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div
        className="hidden md:flex md:w-1/2 h-full bg-cover bg-center items-center justify-center p-8 md:p-16 text-white"
        style={{ backgroundImage: `url(${registerSideImage})` }}
      >
        <div className="bg-black bg-opacity-60 p-6 md:p-8 rounded-lg max-w-xl text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
            One Step Closer To Your Dream
          </h1>
          <p className="text-base md:text-lg">
            A free E-Learning service that is ready to help you become an
            expert.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-full bg-[#1C1E53] flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Register
          </h2>
          <p className="text-sm text-white mb-8">
            Please Register to your account!
          </p>

          {error && <p className="text-red-400 mb-4">{error}</p>}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Enter Your Name"
              className="w-full p-3 rounded bg-[#2D2F6B] text-white placeholder-gray-300 focus:outline-none"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Enter Your Email"
              className="w-full p-3 rounded bg-[#2D2F6B] text-white placeholder-gray-300 focus:outline-none"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              className="w-full p-3 rounded bg-[#2D2F6B] text-white placeholder-gray-300 focus:outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-yellow-400 text-[#000000] font-semibold rounded hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "SIGN UP"}
            </button>
          </form>

          <p className="text-sm text-white mt-6 text-center">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-yellow-400 underline hover:text-yellow-300"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
