import { ClipLoader } from "react-spinners";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";
import { toast } from "sonner";
import { useEffect } from "react";

const ProtectedAdminRoute = ({ children }) => {
  const { user, userRole, loading } = useAuth(); // get loading from context

  useEffect(() => {
    console.log("User:", user);
    console.log("Role:", userRole);
  }, [user, userRole]);

  // Wait for auth to fully initialize
  if (loading || userRole === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#9c6a24" loading={true} size={100} />
      </div>
    );
  }

  // Handle non-admin users
  if (!user || userRole !== "admin") {
    toast.error("Access denied. Admins only.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
