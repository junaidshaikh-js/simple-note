import { Routes, Route } from "react-router-dom";

import { LandingPage, Archive, Trash, PageNotFound } from "./pages";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/archive" element={<Archive />} />
      <Route path="/trash" element={<Trash />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};
