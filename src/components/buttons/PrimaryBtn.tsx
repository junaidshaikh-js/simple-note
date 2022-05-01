type PrimaryBtnProps = {
  children: string;
  type?: "button" | "submit" | "reset";
  cnames?: string;
};

export const PrimaryBtn = ({
  children,
  type = "button",
  cnames,
}: PrimaryBtnProps) => {
  return (
    <button
      className={
        "py-2 px-2.5 bg-primary text-white rounded hover:bg-primaryDark " +
        cnames
      }
      type={type}
    >
      {children}
    </button>
  );
};
