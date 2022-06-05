import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import { addNote, copyNote } from "../../utils/server-request";
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

export const handleNoteCopy = async (
  id: string,
  notes: NoteType[],
  setNotes: setNoteFunc
) => {
  const uid = localStorage.getItem("userId") || "";
  const noteToCopy = notes.find((_note) => _note.id === id) as NoteType;

  const updatedNotesList = [
    ...notes,
    {
      ...noteToCopy,
      id: uuidv4(),
      dateCreated: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  try {
    await copyNote(uid, updatedNotesList);
    setNotes(updatedNotesList);
    toast.success("Note created");
  } catch (error) {
    console.log("error");
    toast.error("Please try again later");
  }
};
