import { MdOutlineDelete, MdOutlineRestoreFromTrash } from "react-icons/md";
import { useState } from "react";

import { TrashCardProps } from "../component.types";
import { useData } from "../../context";
import { addNote } from "../../utils/server-request";
import toast from "react-hot-toast";

export const TrashCard = ({ title, noteText, id, bgColor }: TrashCardProps) => {
  const [showActionBtn, setShowActionBtn] = useState(false);
  const [isInProcess, setIsInProcess] = useState(false);

  const { notes, setNotes } = useData();
  const uid = localStorage.getItem("userId") || "";

  const handleDeleteNote = async (id: string) => {
    setIsInProcess(true);
    try {
      const updatedNoteList = notes.filter((note) => note.id !== id);

      await addNote(updatedNoteList, uid);
      setNotes(updatedNoteList);
      toast.success("Note deleted permanently");
      setIsInProcess(false);
    } catch (error) {
      console.log(error);
      toast.error("Please try again later.");
      setIsInProcess(false);
    }
  };

  const handleRestoreNote = async (id: string) => {
    setIsInProcess(true);
    try {
      const updatedNoteList = notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            isInTrash: false,
          };
        }

        return note;
      });

      await addNote(updatedNoteList, uid);
      setNotes(updatedNoteList);
      toast.success("Note restored.");
      setIsInProcess(false);
    } catch (error) {
      console.log(error);
      toast.error("Please try again later");
      setIsInProcess(false);
    }
  };

  return (
    <article
      className={`p-2 my-5 border-2 border-black rounded-lg max-w-3xl mx-auto whitespace-pre-wrap break-words bg-${bgColor}`}
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
        <button className="mr-5" disabled={isInProcess}>
          <MdOutlineDelete
            title="Delete Forever"
            onClick={() => handleDeleteNote(id)}
          />
        </button>
        <button className="mr-5" disabled={isInProcess}>
          <MdOutlineRestoreFromTrash
            title="Restore"
            onClick={() => handleRestoreNote(id)}
          />
        </button>
      </div>
    </article>
  );
};
