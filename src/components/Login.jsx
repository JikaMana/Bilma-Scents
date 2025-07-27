import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { logIn, loginWithGoogle } = useAuth();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      await logIn(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found") setError("User not found");
      else if (err.code === "auth/wrong-password") setError("Wrong password");
      else if (err.code === "auth/invalid-email") setError("Invalid email");
      else setError("Something went wrong");
      console.log(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.code);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-2 sm:px-4 md:px-8 text-[#9c6a24] max-w-96 mx-auto">
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 text-center font-display italic">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-5 py-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-4 py-2 rounded-md text-gray-600 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full px-4 py-2 rounded-md text-gray-600 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <Button type="submit" style="mt-4">
            Sign In
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <div className="text-center text-gray-500 text-sm">or</div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 border text-gray-600 border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          Continue with Google
        </button>
        <p className="text-center">
          Don't have an account?
          <Link to="/register" className="ml-2 text-[#eab685]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
