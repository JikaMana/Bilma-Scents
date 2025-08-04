import { ClipLoader } from "react-spinners";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";
import { toast } from "sonner";
import { useEffect } from "react";

const ProtectedAdminRoute = ({ children }) => {
  const { user, userRole, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader
          color="#9c6a24"
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  useEffect(() => {
    if (userRole !== "admin") {
      toast.error("Access denied. Admins only.");
    }
  }, [user]);

  if (!user || userRole !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedAdminRoute;
