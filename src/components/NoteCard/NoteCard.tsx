import {
  MdOutlineColorLens,
  MdOutlineArchive,
  MdOutlineDelete,
  MdOutlineNewLabel,
  MdOutlineContentCopy,
} from "react-icons/md";

type NoteCardProps = {
  title?: string;
  noteText: string;
};

export const NoteCard = ({ title, noteText }: NoteCardProps) => {
  return (
    <article className="p-2 my-5 border-2 border-black rounded-lg max-w-3xl mx-auto whitespace-pre-wrap break-words">
      <h2 className="text-xl font-semibold text-xl mb-3">{title}</h2>

      <p>{noteText}</p>

      <div className="mt-5 mb-2 mx-5 flex justify-between text-2xl md:justify-end">
        <button className="md:mr-5">
          <MdOutlineColorLens title="Background Color" />
        </button>
        <button className="md:mr-5">
          <MdOutlineArchive title="Archive" />
        </button>
        <button className="md:mr-5">
          <MdOutlineDelete title="Delete" />
        </button>
        <button className="md:mr-5">
          <MdOutlineNewLabel title="Add Label" />
        </button>
        <button className="md:mr-5">
          <MdOutlineContentCopy title="Make a copy" />
        </button>
      </div>
    </article>
  );
};
