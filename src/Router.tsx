import { Routes, Route } from "react-router-dom";

import { useAuth } from "./context";

import {
  LandingPage,
  Home,
  Archive,
  Trash,
  PageNotFound,
  Login,
  Signup,
} from "./pages";

export const Router = () => {
  const authData = useAuth();

  return (
    <Routes>
      <Route path="/" element={authData?.uid ? <Home /> : <LandingPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/trash" element={<Trash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};
