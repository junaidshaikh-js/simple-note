import React from "react";

export type buttonProps = {
  children: string;
  type?: "button" | "submit" | "reset";
  cnames?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disable?: boolean;
};
