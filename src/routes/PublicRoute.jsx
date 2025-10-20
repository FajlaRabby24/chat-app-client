import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { authUser, loading } = useAuth();

  if (loading) {
    return (
      <h2 className="text-2xl text-white font-semibold text-center">Loading</h2>
    );
  }

  if (authUser) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default PublicRoute;
