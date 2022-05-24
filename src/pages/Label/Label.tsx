import { useParams } from "react-router-dom";
import { MdLabelOutline } from "react-icons/md";

import { useData } from "../../context";
import { LabelTag } from "../../components/LabelTag/LabelTag";

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
          return (
            <article
              className={`p-2 my-5 mx-5 border-2 border-black rounded-lg max-w-3xl mx-auto whitespace-pre-wrap break-words bg-${note.bgColor}`}
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
            </article>
          );
        })
      )}
    </div>
  );
};
