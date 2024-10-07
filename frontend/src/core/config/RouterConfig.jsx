import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Login } from "../user/pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { Users } from "../user/pages/Users";

const DefaultPage = () => {
  return <Outlet />;
};

export const RouterConfig = () => {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          element={
            <PrivateRoute>
              <DefaultPage />
            </PrivateRoute>
          }
        >
          <Route path="users" element={<Users/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
