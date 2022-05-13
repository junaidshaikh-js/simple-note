import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Aside } from "../Aside/Aside";
import { Header } from "../Header/Header";

export const Navigation = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsSideMenuOpen(false);
  }, [location]);

  return (
    <>
      <Header setIsSideMenuOpen={setIsSideMenuOpen} />
      <Aside isSideMenuOpen={isSideMenuOpen} />
    </>
  );
};
