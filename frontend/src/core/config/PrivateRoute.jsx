import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const isLogged = true;

  if (!isLogged) {
    return <Navigate to={"/login"} />;
  }

  return children;
};
