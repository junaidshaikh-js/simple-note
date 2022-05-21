/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { AddNote, Loader, NoteCard, SortByDate } from "../../components";
import { useData } from "../../context";

export const Home = () => {
  const [sortBy, setSortBy] = useState("oldest first");
  const { notes, isLoading, getNotes } = useData();
  const uid = localStorage.getItem("userId");

  useEffect(() => {
    if (notes.length === 0) {
      getNotes();
    }
  }, [uid]);

  const filteredNotes = notes.filter((note) => !note.isInTrash);

  if (sortBy === "latest first") {
    filteredNotes.sort((a, b) => b.updatedAt - a.updatedAt);
  } else {
    filteredNotes.sort((a, b) => a.updatedAt - b.updatedAt);
  }

  return (
    <div className="md:ml-72">
      {isLoading ? (
        <Loader />
      ) : (
        <main className="mx-5">
          <SortByDate sortBy={sortBy} setSortBy={setSortBy} />
          <AddNote />

          <section>
            {filteredNotes.map((note) => {
              return (
                <NoteCard
                  title={note.title}
                  noteText={note.noteText}
                  id={note.id}
                  key={note.id}
                  updatedAt={note.updatedAt}
                />
              );
            })}
          </section>
        </main>
      )}
    </div>
  );
};
