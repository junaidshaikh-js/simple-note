import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./components";

import { useAuth } from "./context";

import {
  LandingPage,
  Home,
  Archive,
  Trash,
  PageNotFound,
  Login,
  Signup,
  Label,
} from "./pages";

export const Router = () => {
  const authData = useAuth();

  return (
    <Routes>
      <Route path="/" element={authData.uid ? <Home /> : <LandingPage />} />
      <Route
        path="/archive"
        element={
          <RequireAuth>
            <Archive />
          </RequireAuth>
        }
      />
      <Route
        path="/trash"
        element={
          <RequireAuth>
            <Trash />
          </RequireAuth>
        }
      />
      <Route
        path="/login"
        element={
          <RequireAuth>
            <Login />
          </RequireAuth>
        }
      />
      <Route
        path="/signup"
        element={
          <RequireAuth>
            <Signup />
          </RequireAuth>
        }
      />
      <Route
        path="/label/:labelName"
        element={
          <RequireAuth>
            <Label />
          </RequireAuth>
        }
      />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};
