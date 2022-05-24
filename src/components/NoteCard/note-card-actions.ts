import toast from "react-hot-toast";

import { addNote } from "../../utils/server-request";
import { NoteType } from "../../context/context.type";

type setNoteFunc = React.Dispatch<React.SetStateAction<NoteType[]>>;

export const handleNoteDelete = async (
  notes: NoteType[],
  setNotes: setNoteFunc,
  id: string
) => {
  const uid = localStorage.getItem("userId") || "";
  const notesList = notes.map((note) => {
    if (note.id === id) {
      return {
        ...note,
        isInTrash: true,
      };
    }

    return note;
  });

  try {
    await addNote(notesList, uid);
    setNotes(notesList);
    toast.success("Note Trashed");
  } catch (error) {
    console.log(error);
    toast.error("Please try again later.");
  }
};

export const handleNoteArchive = async (
  notes: NoteType[],
  setNotes: setNoteFunc,
  id: string
) => {
  const uid = localStorage.getItem("userId") || "";
  const notesList = notes.map((note) => {
    if (note.id === id) {
      return {
        ...note,
        isArchived: true,
      };
    }

    return note;
  });

  try {
    await addNote(notesList, uid);
    setNotes(notesList);
    toast.success("Note Archived");
  } catch (error) {
    console.log(error);
    toast.error("Please try again later.");
  }
};
