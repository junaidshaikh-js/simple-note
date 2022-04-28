type PrimaryBtnProps = {
  children: string;
};

export const PrimaryBtn = ({ children }: PrimaryBtnProps) => {
  return (
    <button className="primary-btn py-2 px-2.5 bg-primary text-white rounded hover:bg-primaryDark">
      {children}
    </button>
  );
};
