import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import goldenBackground from "../assets/images/background/goldenBakground.jpeg";
import bilmaLogo from "../assets/images/bilma-scents-logo.png";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { X } from "lucide-react";

const AuthLayout = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  console.log(user);
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div
        className="absolute top-4 right-4 hover:cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <X color="#9c6a24" size={32} />
      </div>
      <div
        className="hidden md:flex md:w-1/2 lg:w-3/5 px-6 py-10 text-white"
        style={{
          backgroundImage: `url(${goldenBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* 👇 This wrapper centers everything in the middle of the height */}
        <div className="flex flex-col justify-center items-center text-center w-full max-w-xl mx-auto min-h-full space-y-6">
          <img
            src={bilmaLogo}
            alt="Bilma Logo"
            className="h-24 md:h-32 w-auto"
          />

          <h1 className="text-4xl md:text-6xl font-serif italic font-semibold leading-tight">
            Welcome to <br /> Bilma Scents
          </h1>

          <p className="text-sm md:text-lg text-white/90">
            Timeless luxury meets captivating scent. Discover handcrafted
            fragrances that create unforgettable impressions.
          </p>
          <Button
            type="submit"
            style="mt-4 max-w-32"
            disabled={!user}
            onClick={handleLogout}
          >
            Log Out
          </Button>
          <footer className="text-xs text-white/60 pt-6 border-t border-white/20 w-full">
            © {new Date().getFullYear()} Bilma. All rights reserved.
          </footer>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="flex-1 bg-white overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
