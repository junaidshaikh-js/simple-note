import { useParams } from "react-router-dom";
import { MdLabelOutline } from "react-icons/md";

import { useData } from "../../context";

export const Label = () => {
  const { labelName } = useParams();
  const { notes } = useData();

  const labelNotes = notes.filter((note) => {
    for (let label of note.labels) {
      return label === labelName;
    }

    return false;
  });

  return (
    <div className="md:ml-72">
      {!labelNotes.length ? (
        <section className="flex items-center justify-center flex-col min-h-70 text-gray-500 text-xl">
          <MdLabelOutline className="text-6xl" />
          <p>No notes with label yet.</p>
        </section>
      ) : (
        labelNotes.map((note) => {
          return <p>{note.noteText}</p>;
        })
      )}
    </div>
  );
};
