import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Login } from "../user/pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { Users } from "../user/pages/Users";
import { Home } from "../home/pages/Home";
import { Warehouse } from "../warehouse/pages/Warehouse";
import ProductPage from "../product/pages/Product";
import RequestPage from "../request/pages/RequestPage"
import { AlertProvider } from "../components/AlertProvider";

const DefaultPage = () => {
  return <Outlet />;
};

export const RouterConfig = () => {
  return (
    <AlertProvider>
      <BrowserRouter>
        <Routes>
          <Route
              path="*"
              element={<Navigate to="/home" replace />}
          />
          <Route path="login" element={<Login />} />
          <Route
            element={
              <PrivateRoute>
                <DefaultPage />
              </PrivateRoute>
            }
          >
            <Route path="users" element={<Users />} />
            <Route path="home" element={<Home />} />
            <Route path="warehouse" element={<Warehouse />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="request" element={<RequestPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
};
