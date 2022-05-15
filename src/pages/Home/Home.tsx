/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { AddNote, Loader, NoteCard } from "../../components";
import { useData } from "../../context";

export const Home = () => {
  const { notes, isLoading, getNotes } = useData();
  const uid = localStorage.getItem("userId");

  useEffect(() => {
    if (notes.length === 0) {
      getNotes();
    }
  }, [uid]);

  const filteredNotes = notes.filter((note) => !note.isInTrash);

  return (
    <div className="md:ml-72">
      {isLoading ? (
        <Loader />
      ) : (
        <main className="mx-5">
          <AddNote />

          <section>
            {filteredNotes.map((note) => {
              return (
                <NoteCard
                  title={note.title}
                  noteText={note.noteText}
                  id={note.id}
                  key={note.id}
                />
              );
            })}
          </section>
        </main>
      )}
    </div>
  );
};
