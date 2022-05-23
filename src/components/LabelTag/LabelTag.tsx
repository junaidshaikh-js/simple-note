import { AiOutlineClose } from "react-icons/ai";
import { useData } from "../../context";
import { addNote } from "../../utils/server-request";

type LabelTagProps = {
  currentLabel: string;
  noteId: string;
};

export const LabelTag = ({ currentLabel, noteId }: LabelTagProps) => {
  const { notes, setNotes } = useData();
  const uid = localStorage.getItem("userId") || "";

  const removeLabel = async (id: string) => {
    const updatedNoteList = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          labels: note.labels.filter((label) => label !== currentLabel),
        };
      }

      return note;
    });

    await addNote(updatedNoteList, uid);
    setNotes(updatedNoteList);
  };

  return (
    <div className="bg-slate-400 border rounded-full py-1 px-3 flex items-center mr-1">
      <span>{currentLabel}</span>
      <button
        className="ml-3"
        title="Remove tag"
        onClick={() => removeLabel(noteId)}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};
