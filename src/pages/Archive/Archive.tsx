import { useState } from "react";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import toast from "react-hot-toast";

import { useData } from "../../context";
import { LabelTag } from "../../components";
import { addNote } from "../../utils/server-request";

export const Archive = () => {
  const [isInProcess, setIsInProcess] = useState(false);
  const { notes, setNotes } = useData();
  const uid = localStorage.getItem("userId") || "";

  const notesInTrash = notes.filter((note) => note.isArchived);

  const handleUnarchiveNote = async (id: string) => {
    setIsInProcess(true);
    try {
      const updatedNoteList = notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            isArchived: false,
          };
        }

        return note;
      });

      await addNote(updatedNoteList, uid);
      setNotes(updatedNoteList);
      toast.success("Note unarchived.");
    } catch (error) {
      console.log(error);
      toast.error("Please try again later");
    } finally {
      setIsInProcess(false);
    }
  };

  return (
    <div className="md:ml-72">
      <main className="mx-5">
        {!notesInTrash.length ? (
          <main className="flex items-center justify-center flex-col min-h-70 text-gray-500 text-xl">
            <BiArchiveIn className="text-6xl" />
            <p>No notes in trash</p>
          </main>
        ) : (
          <main>
            {notesInTrash.map((note) => {
              return (
                <article
                  className={`p-2 my-5 mx-5 md:mx-auto border-2 border-black rounded-lg max-w-3xl mx-auto whitespace-pre-wrap break-words bg-${note.bgColor}`}
                >
                  <div>
                    <h2 className="text-xl font-semibold text-xl mb-3">
                      {note.title}
                    </h2>
                    <p>{note.noteText}</p>
                  </div>

                  <div className="my-2 flex">
                    {note.labels.map((label) => (
                      <LabelTag currentLabel={label} noteId={note.id} />
                    ))}
                  </div>

                  <div>
                    <button
                      onClick={() => handleUnarchiveNote(note.id)}
                      disabled={isInProcess}
                    >
                      <BiArchiveOut title="Unarchive" fontSize="1.2rem" />
                    </button>
                  </div>
                </article>
              );
            })}
          </main>
        )}
      </main>
    </div>
  );
};
