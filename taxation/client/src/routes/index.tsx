import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import TaxationDetail from "../pages";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { RootProvider } from "../providers";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route element={<RootProvider><Outlet /></RootProvider>}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<TaxationDetail />} />
        </Route>
      </Route>
    </>
  )
);
