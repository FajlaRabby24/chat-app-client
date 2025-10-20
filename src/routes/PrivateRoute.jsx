import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { authUser, loading } = useAuth();
  console.log(authUser);
  const locaiton = useLocation();

  if (loading) {
    return (
      <h2 className="text-2xl text-white font-semibold text-center">Loading</h2>
    );
  }

  if (!authUser) {
    return <Navigate to={"/login"} state={{ from: locaiton.pathname }} />;
  }
  return children;
};

export default PrivateRoute;
