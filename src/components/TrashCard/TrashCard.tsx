import { MdOutlineDelete, MdOutlineRestoreFromTrash } from "react-icons/md";
import { useState } from "react";

import { NoteCardProps } from "../component.types";

export const TrashCard = ({ title, noteText, id }: NoteCardProps) => {
  const [showActionBtn, setShowActionBtn] = useState(false);

  return (
    <article
      className="p-2 my-5 border-2 border-black rounded-lg max-w-3xl mx-auto whitespace-pre-wrap break-words"
      onMouseEnter={() => setShowActionBtn(true)}
      onMouseLeave={() => setShowActionBtn(false)}
    >
      <div>
        <h2 className="text-xl font-semibold text-xl mb-3">{title}</h2>

        <p>{noteText}</p>
      </div>

      <div
        className={`mt-5 mb-2 mx-2 flex text-2xl transition-opacity ${
          showActionBtn ? "md:opacity-1" : "md:opacity-0"
        }`}
      >
        <button className="mr-5">
          <MdOutlineDelete title="Delete Forever" />
        </button>
        <button className="mr-5">
          <MdOutlineRestoreFromTrash title="Restore" />
        </button>
      </div>
    </article>
  );
};
