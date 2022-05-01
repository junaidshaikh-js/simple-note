import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

type HeaderProps = {
  setIsSideMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header = ({ setIsSideMenuOpen }: HeaderProps) => {
  return (
    <div className="bg-white sticky top-0 border-b border-black">
      <header className="bg-white p-3 flex items-center	md:ml-10">
        <div
          className="mr-5 cursor-pointer md:hidden"
          onClick={() => {
            if (setIsSideMenuOpen) {
              setIsSideMenuOpen((s) => !s);
            }
          }}
        >
          {setIsSideMenuOpen && <FaBars fontSize="1.5rem" />}
        </div>
        <div>
          <Link to="/">
            <span className="font-bold text-3xl">
              Simple<span className="text-primary">Note</span>
            </span>
          </Link>
        </div>
      </header>
    </div>
  );
};
