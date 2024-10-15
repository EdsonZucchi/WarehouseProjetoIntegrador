import { Navigate } from "react-router-dom";
import { userUseCase } from "../user/usecase/UserUseCase";
import { useEffect, useState } from "react";

export const PrivateRoute = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    userUseCase
      .validToken()
      .then((response) => {
        setIsLogged(!!response);
        setLoad(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLogged(false);
        setLoad(false);
      });
  }, [window.location]);

  if (!isLogged && !load) {
    return <Navigate to={"/login"} />;
  }

  return children;
};
