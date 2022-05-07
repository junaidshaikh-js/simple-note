import { buttonProps } from "./button.type";

export const PrimaryOutlineBtn = ({
  children,
  type = "button",
  cnames,
  onClick,
  disable,
}: buttonProps) => {
  return (
    <button
      className={
        "py-2 px-2.5 rounded text-black border border-primary hover:bg-primary hover:text-white transition-colors	 " +
        cnames
      }
      type={type}
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  );
};
