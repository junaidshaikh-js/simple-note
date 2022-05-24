/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { AddNote, Loader, NoteCard, SortByDate } from "../../components";
import { useData } from "../../context";
import { NoteType } from "../../context/context.type";

export const Home = () => {
  const [sortBy, setSortBy] = useState("oldest first");
  const [isColorBoxVisible, setIsColorBoxVisible] = useState({
    isVisible: false,
    index: -1,
  });
  const [labelDialogState, setLabelDialogState] = useState({
    isVisible: false,
    index: -1,
  });

  const { notes, isLoading, getNotes } = useData();
  const uid = localStorage.getItem("userId");

  useEffect(() => {
    if (notes.length === 0) {
      getNotes();
    }
  }, [uid]);

  const getFilteredNotes = (notes: NoteType[]) => {
    let filteredNotes = notes.filter((note) => !note.isInTrash);
    filteredNotes = filteredNotes.filter((note) => !note.isArchived);

    return filteredNotes;
  };

  const filteredNotes = getFilteredNotes(notes);

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
            {filteredNotes.map((note, index) => {
              return (
                <NoteCard
                  title={note.title}
                  noteText={note.noteText}
                  id={note.id}
                  key={note.id}
                  updatedAt={note.updatedAt}
                  isColorBoxVisible={isColorBoxVisible}
                  setIsColorBoxVisible={setIsColorBoxVisible}
                  index={index}
                  bgColor={note.bgColor}
                  noteLabels={note.labels}
                  labelDialogState={labelDialogState}
                  setLabelDialogState={setLabelDialogState}
                />
              );
            })}
          </section>
        </main>
      )}
    </div>
  );
};
