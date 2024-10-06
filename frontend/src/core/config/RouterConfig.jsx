import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Login } from "../user/pages/Login";
import { PrivateRoute } from "./PrivateRoute";

const DefaultPage = () => {
  return <Outlet />;
};

export const RouterConfig = () => {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="warehouse"
          element={
            <PrivateRoute>
              <DefaultPage />
            </PrivateRoute>
          }
        >
          <Route path="newPage" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
