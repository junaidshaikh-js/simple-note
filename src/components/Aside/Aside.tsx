import { CSSProperties } from "react";
import { AiOutlineBulb, AiOutlineEdit, AiOutlineLogout } from "react-icons/ai";
import { BiArchiveIn, BiTrash } from "react-icons/bi";
import { NavLink } from "react-router-dom";

import { useAuth, useData } from "../../context";
import { Loader } from "../loader/Loader";

type AsideProps = {
  isSideMenuOpen: boolean;
};

let activeStyle: CSSProperties = {
  backgroundColor: "#28292c11",
  borderTopRightRadius: "999px",
  borderBottomRightRadius: "999px",
};

export const Aside = ({ isSideMenuOpen }: AsideProps) => {
  const authData = useAuth();
  const { setNotes } = useData();

  return (
    <div
      className={`overflow-hidden absolute bg-grey h-90 transition-all md:fixed md:w-64 md:shadow-none ${
        isSideMenuOpen ? "w-6/12 shadow pr-5" : "w-0"
      }`}
    >
      {authData.loading && <Loader />}
      <nav className="flex flex-col py-5 h-full">
        <ul>
          <li className="hover:bg-hoverClr hover:rounded-r-full">
            <NavLink
              to="/"
              className="pl-5 flex items-center text-xl my-5 py-2 w-full"
              style={({ isActive }: any) => (isActive ? activeStyle : {})}
            >
              <span>
                <AiOutlineBulb className="mr-2" />
              </span>
              Notes
            </NavLink>
          </li>
          <li className="flex items-center text-xl my-5 py-2 pl-5 whitespace-nowrap hover:bg-hoverClr hover:rounded-r-full">
            <span>
              <AiOutlineEdit className="mr-2" />
            </span>
            Edit labels
          </li>
          <li className=" hover:bg-hoverClr hover:rounded-r-full">
            <NavLink
              to="/archive"
              className="pl-5 flex items-center text-xl my-5 py-2"
              style={({ isActive }: any) => (isActive ? activeStyle : {})}
            >
              <span>
                <BiArchiveIn className="mr-2" />
              </span>
              Archive
            </NavLink>
          </li>
          <li className="hover:bg-hoverClr hover:rounded-r-full">
            <NavLink
              to="/trash"
              className="flex items-center text-xl my-5 py-2 pl-5"
              style={({ isActive }: any) => (isActive ? activeStyle : {})}
            >
              <span>
                <BiTrash className="mr-2" />
              </span>
              Trash
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center justify-between pl-5 text-xl text-primary mt-auto hover:font-bold">
          <span>Junaid</span>
          <button
            onClick={async () => {
              await authData.logout();
              setNotes([]);
            }}
          >
            <AiOutlineLogout />
            <span className="sr-only">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
