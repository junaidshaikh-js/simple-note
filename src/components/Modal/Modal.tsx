import { useState, useRef, ChangeEvent } from "react";
import toast from "react-hot-toast";

import { useData } from "../../context";
import { addNote } from "../../utils/server-request";
import { PrimaryOutlineBtn } from "../buttons/PrimaryOutlineBtn";
import { NoteTextareaInput, TitleInput } from "../NoteFormInput";

type ModalProps = {
  title?: string;
  noteText: string;
  id: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal = ({ title, noteText, id, setShowModal }: ModalProps) => {
  const [noteDetails, setNoteDetails] = useState({
    title,
    noteText,
  });

  const textArea = useRef<HTMLTextAreaElement>(null!);

  const { notes, setNotes } = useData();

  const handleNoteChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name: key, value } = e.target;

    if (key === "noteText") {
      textArea.current.style.height = textArea.current.scrollHeight + "px";
    }

    if (key === "note" && value === "") {
      textArea.current.style.height = "auto";
    }

    setNoteDetails((d) => {
      return {
        ...d,
        [key]: value,
      };
    });
  };

  const updateNote = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    if (noteDetails.noteText === noteText && noteDetails.title === title) {
      setShowModal(false);
      return;
    }

    const notesList = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          title: noteDetails.title,
          noteText: noteDetails.noteText,
          updatedAt: new Date().getTime(),
        };
      }

      return note;
    });

    const uid = localStorage.getItem("userId") || "";

    await addNote(notesList, uid);
    setNotes(notesList);
    toast.success("Note updated");
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-wrapper flex items-center	justify-center z-10">
      <section className="my-5 p-2 bg-white max-width-md mx-auto rounded border border-black max-h-[70vh]	overflow-y-scroll">
        <form className="flex flex-col">
          <TitleInput
            changeHandler={handleNoteChange}
            value={noteDetails.title}
          />

          <NoteTextareaInput
            refObject={textArea}
            value={noteDetails.noteText}
            changeHandler={handleNoteChange}
          />

          <div className="ml-auto mr-5">
            <PrimaryOutlineBtn
              type="submit"
              cnames="py-1 mr-5"
              onClick={(e) => updateNote(e, id)}
            >
              Save
            </PrimaryOutlineBtn>
            <button
              className="font-medium text-lg"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
