import { FaBars } from "react-icons/fa";

type HeaderProps = {
  setIsSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header = ({ setIsSideMenuOpen }: HeaderProps) => {
  return (
    <div className="bg-white sticky top-0">
      <header className="bg-white p-3 flex items-center	md:ml-10">
        <div
          className="mr-5 cursor-pointer md:hidden"
          onClick={() => setIsSideMenuOpen((s) => !s)}
        >
          <FaBars fontSize="1.5rem" />
        </div>
        <div>
          <span className="font-bold text-3xl">
            Simple<span className="text-primary">Note</span>
          </span>
        </div>
      </header>
    </div>
  );
};
