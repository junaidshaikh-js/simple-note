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
import { ReactPortal } from "../ReactPortal/ReactPortal";
import { Modal } from "../Modal/Modal";

export const NoteCard = ({ title, noteText, id }: NoteCardProps) => {
  const [showActionBtn, setShowActionBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { notes, setNotes } = useData();

  return (
    <article
      className="p-2 my-5 border-2 border-black rounded-lg max-w-3xl mx-auto whitespace-pre-wrap break-words"
      onMouseEnter={() => setShowActionBtn(true)}
      onMouseLeave={() => setShowActionBtn(false)}
    >
      <div onClick={() => setShowModal(true)} className="cursor-pointer">
        <h2 className="text-xl font-semibold text-xl mb-3 text-ellipsis	whitespace-nowrap	overflow-hidden mb-5">
          {title}
        </h2>

        <p>
          {noteText ? (
            noteText
          ) : (
            <span className="text-gray-400">Empty Note</span>
          )}
        </p>
      </div>

      <div
        className={`mt-5 mb-2 mx-5 flex justify-between text-2xl md:justify-end transition-opacity ${
          showActionBtn ? "md:opacity-1" : "md:opacity-0"
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

      {showModal && (
        <ReactPortal>
          <Modal
            title={title}
            noteText={noteText}
            id={id}
            setShowModal={setShowModal}
          />
        </ReactPortal>
      )}
    </article>
  );
};
