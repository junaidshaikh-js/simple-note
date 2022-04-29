import { AiOutlineBulb, AiOutlineEdit, AiOutlineLogout } from "react-icons/ai";
import { BiArchiveIn, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

type AsideProps = {
  isSideMenuOpen: boolean;
};

export const Aside = ({ isSideMenuOpen }: AsideProps) => {
  return (
    <div
      className={`overflow-hidden absolute bg-grey h-90 transition-all md:fixed md:w-64 md:shadow-none ${
        isSideMenuOpen ? "w-6/12 shadow pr-5" : "w-0"
      }`}
    >
      <nav className="flex flex-col py-5 h-full">
        <ul>
          <li className="pl-5 hover:bg-hoverClr hover:rounded-r-full">
            <Link to="/" className="flex items-center text-xl my-5 py-2">
              <span>
                <AiOutlineBulb className="mr-2" />
              </span>
              Notes
            </Link>
          </li>
          <li className="flex items-center text-xl my-5 py-2 pl-5 whitespace-nowrap hover:bg-hoverClr hover:rounded-r-full">
            <span>
              <AiOutlineEdit className="mr-2" />
            </span>
            Edit labels
          </li>
          <li className="pl-5 hover:bg-hoverClr hover:rounded-r-full">
            <Link
              to="/archive"
              className="flex items-center text-xl my-5 py-2 "
            >
              <span>
                <BiArchiveIn className="mr-2" />
              </span>
              Archive
            </Link>
          </li>
          <li className="hover:bg-hoverClr hover:rounded-r-full pl-5">
            <Link to="/trash" className="flex items-center text-xl my-5 py-2">
              <span>
                <BiTrash className="mr-2" />
              </span>
              Trash
            </Link>
          </li>
        </ul>

        <div className="flex items-center justify-between pl-5 text-xl text-primary mt-auto hover:font-bold">
          <span>Junaid</span>
          <button>
            <AiOutlineLogout />
            <span className="sr-only">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
