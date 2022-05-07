import { buttonProps } from "./button.type";

export const PrimaryBtn = ({
  children,
  type = "button",
  cnames,
  disable,
}: buttonProps) => {
  return (
    <button
      className={
        "py-2 px-2.5 bg-primary text-white rounded hover:bg-primaryDark transition-colors " +
        cnames
      }
      type={type}
      disabled={disable}
    >
      {children}
    </button>
  );
};
