import { useState, MouseEvent, ChangeEvent, useRef } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import { useData } from "../../context";
import { PrimaryOutlineBtn } from "../buttons/PrimaryOutlineBtn";
import { addNote } from "../../utils/server-request";
import { NoteTextareaInput, TitleInput } from "../NoteFormInput";

export const AddNote = () => {
  const initialNoteDetails = {
    title: "",
    noteText: "",
  };

  const [isNoteAdding, setIsNoteAdding] = useState(false);
  const [noteDetails, setNoteDetails] = useState(initialNoteDetails);

  const textArea = useRef<HTMLTextAreaElement>(null!);

  const { notes, setNotes } = useData();

  const handleCreateNote = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!noteDetails.noteText && !noteDetails.title) {
      setIsNoteAdding(false);
    } else {
      const note = {
        id: uuidv4(),
        title: noteDetails.title,
        noteText: noteDetails.noteText,
        dateCreated: new Date().getTime(),
        isArchived: false,
        isInTrash: false,
        bgColor: "white",
        labels: [],
        updatedAt: new Date().getTime(),
      };

      const notesList = [...notes, note];
      const uid = localStorage.getItem("userId") || "";

      await addNote(notesList, uid);
      setNotes(notesList);
      toast.success("Note added");
      setIsNoteAdding(false);
      setNoteDetails(initialNoteDetails);
    }
  };

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

  return (
    <section className="mb-5  mt-10 p-2 max-width-md mx-auto rounded border border-black">
      <form className="flex flex-col">
        {isNoteAdding && (
          <TitleInput
            value={noteDetails.title}
            changeHandler={handleNoteChange}
          />
        )}

        <NoteTextareaInput
          refObject={textArea}
          value={noteDetails.noteText}
          clickHandler={() => {
            if (!isNoteAdding) {
              setIsNoteAdding(true);
            }
          }}
          changeHandler={handleNoteChange}
        />

        {isNoteAdding && (
          <div className="ml-auto mr-5">
            <PrimaryOutlineBtn
              type="submit"
              cnames="py-1  mr-5"
              onClick={(e) => handleCreateNote(e)}
            >
              Create
            </PrimaryOutlineBtn>
            <button
              onClick={() => {
                setIsNoteAdding((n) => !n);
                setNoteDetails(initialNoteDetails);
                textArea.current.style.height = "auto";
              }}
              className="font-medium text-lg"
            >
              Close
            </button>
          </div>
        )}
      </form>
    </section>
  );
};
