import { useState } from "react";
import { Aside } from "../Aside/Aside";
import { Header } from "../Header/Header";

export const Navigation = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <Header setIsSideMenuOpen={setIsSideMenuOpen} />
      <Aside isSideMenuOpen={isSideMenuOpen} />
    </>
  );
};
