import React from "react";
import { Link } from "react-router";
import Button from "./Button";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // handle email/password login here
  };

  const handleGoogleLogin = () => {
    // handle Google sign-in logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-[#9c6a24]">
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          Welcome Back!
        </h2>
        <form onSubmit={handleLogin} className="space-y-5 p-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md text-gray-600 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md text-gray-600 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <Button type="submit" style="mt-4">
            Sign In
          </Button>
        </form>
        <div className="text-center text-gray-500 text-sm">or</div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 border text-gray-600 border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          {/* <FcGoogle className="text-xl" /> */}
          Continue with Google
        </button>
        <p className="text-center">
          Don't have an account?
          <Link to="/register" className="ml-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
