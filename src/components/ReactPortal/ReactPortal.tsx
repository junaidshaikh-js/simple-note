import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

type ReactPortalProps = {
  children: React.ReactNode;
};

const modalRoot = document.getElementById("modal") as HTMLElement;

export const ReactPortal = ({ children }: ReactPortalProps) => {
  const elRef = useRef<HTMLElement>(null!);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const current = elRef.current;

    modalRoot!.appendChild(current);

    return () => void modalRoot!.removeChild(current);
  }, []);

  return createPortal(children, elRef.current);
};
