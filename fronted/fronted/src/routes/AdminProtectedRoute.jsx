import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated, role, loading } = useSelector((state) => state.auth);

  // While checking cookie
  if (loading) return null; // or loader

  // Not admin → redirect to login
  if (!isAuthenticated || role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
