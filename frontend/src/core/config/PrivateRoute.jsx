import { Navigate } from "react-router-dom";
import { userUseCase } from "../user/usecase/UserUseCase";

export const PrivateRoute = ({ children }) => {
  var isLogged = true;

  // try {
  //   if (userUseCase.validToken() != null){
  //     isLogged = true;
  //   }
  // }catch (error) {
  //   isLogged = false;
  // }
  
  if (!isLogged) {
    return <Navigate to={"/login"} />;
  }

  return children;
};
