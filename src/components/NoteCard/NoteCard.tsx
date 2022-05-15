import {
  MdOutlineColorLens,
  MdOutlineArchive,
  MdOutlineDelete,
  MdOutlineNewLabel,
  MdOutlineContentCopy,
} from "react-icons/md";
import { useState } from "react";

import { handleNoteDelete } from "./note-card-actions";
import { useData } from "../../context";
import { NoteCardProps } from "../component.types";

export const NoteCard = ({ title, noteText, id }: NoteCardProps) => {
  const [showActionBtn, setShowActionBtn] = useState(false);

  const { notes, setNotes } = useData();

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
        className={`mt-5 mb-2 mx-5 flex justify-between text-2xl md:justify-end transition-opacity ${
          showActionBtn ? "opacity-1" : "opacity-0"
        }`}
      >
        <button className="md:mr-5">
          <MdOutlineColorLens title="Background Color" />
        </button>
        <button className="md:mr-5">
          <MdOutlineArchive title="Archive" />
        </button>
        <button
          className="md:mr-5"
          onClick={() => handleNoteDelete(notes, setNotes, id)}
        >
          <MdOutlineDelete title="Delete" />
        </button>
        <button className="md:mr-5">
          <MdOutlineNewLabel title="Add Label" />
        </button>
        <button className="md:mr-5">
          <MdOutlineContentCopy title="Make a copy" />
        </button>
      </div>
    </article>
  );
};
