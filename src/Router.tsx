import { Routes, Route } from "react-router-dom";

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
  let token = false;

  return (
    <Routes>
      <Route path="/" element={token ? <Home /> : <LandingPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/trash" element={<Trash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};
