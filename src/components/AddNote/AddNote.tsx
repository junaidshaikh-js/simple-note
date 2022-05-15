import { useState, MouseEvent, ChangeEvent, useRef } from "react";
import toast from "react-hot-toast";

import { useData } from "../../context";
import { PrimaryOutlineBtn } from "../buttons/PrimaryOutlineBtn";
import { addNote } from "../../utils/server-request";

export const AddNote = () => {
  const initialNoteDetails = {
    title: "",
    note: "",
  };

  const [isNoteAdding, setIsNoteAdding] = useState(false);
  const [noteDetails, setNoteDetails] = useState(initialNoteDetails);

  const textArea = useRef<HTMLTextAreaElement>(null!);

  const { notes, setNotes } = useData();

  const handleCreateNote = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!noteDetails.note) {
      setIsNoteAdding(false);
    } else {
      const note = {
        title: noteDetails.title,
        noteText: noteDetails.note,
        dateCreated: new Date(),
        isArchived: false,
        isInTrash: false,
        bgColor: "white",
        labels: [],
        updatedAt: new Date(),
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

    if (key === "note") {
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
    <section className="my-5 p-2 max-width-md mx-auto rounded border border-black">
      <form className="flex flex-col">
        {isNoteAdding && (
          <div>
            <label htmlFor="title" className="sr-only">
              Title
            </label>

            <input
              type="text"
              id="title"
              placeholder="Title"
              className="bg-transparent border-none outline-none my-2 p-1 placeholder:text-black placeholder:text-xl font-semibold text-xl"
              value={noteDetails.title}
              name="title"
              onChange={handleNoteChange}
            />
          </div>
        )}

        <div>
          <label htmlFor="note" className="sr-only">
            Take a note
          </label>

          <textarea
            id="note"
            rows={1}
            ref={textArea}
            placeholder="Take a note..."
            className="bg-transparent outline-none border-none my-2 p-1 w-full  overflow-hidden	 resize-none placeholder:text-black placeholder:text-lg"
            value={noteDetails.note}
            name="note"
            onChange={handleNoteChange}
            onClick={() => {
              if (!isNoteAdding) {
                setIsNoteAdding(true);
              }
            }}
          />
        </div>

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
