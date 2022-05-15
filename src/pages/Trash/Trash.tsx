import { TrashCard } from "../../components";
import { useData } from "../../context";

export const Trash = () => {
  const { notes } = useData();

  const notesInTrash = notes.filter((note) => note.isInTrash);

  return (
    <div className="md:ml-72">
      <main className="mx-5">
        {notesInTrash.map((note) => {
          return (
            <TrashCard
              title={note.title}
              noteText={note.noteText}
              id={note.id}
              key={note.id}
            />
          );
        })}
      </main>
    </div>
  );
};
