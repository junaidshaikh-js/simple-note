import { BsFillTrashFill } from "react-icons/bs";

import { TrashCard } from "../../components";
import { useData } from "../../context";

export const Trash = () => {
  const { notes } = useData();

  const notesInTrash = notes.filter((note) => note.isInTrash);

  return (
    <div className="md:ml-72 mt-20">
      <main className="mx-5">
        {!notesInTrash.length ? (
          <main className="flex items-center justify-center flex-col min-h-70 text-gray-500 text-xl">
            <BsFillTrashFill className="text-6xl" />
            <p>No notes in trash</p>
          </main>
        ) : (
          <main>
            {notesInTrash.map((note, index) => {
              return (
                <TrashCard
                  title={note.title}
                  noteText={note.noteText}
                  id={note.id}
                  key={note.id}
                  bgColor={note.bgColor}
                />
              );
            })}
          </main>
        )}
      </main>
    </div>
  );
};
