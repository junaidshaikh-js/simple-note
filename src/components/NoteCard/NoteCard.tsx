import {
  MdOutlineColorLens,
  MdOutlineArchive,
  MdOutlineDelete,
  MdOutlineNewLabel,
  MdOutlineContentCopy,
} from "react-icons/md";
import { useState } from "react";

import { handleNoteDelete } from "./note-card-actions";
import { useData } from "../../context";
import { NoteCardProps } from "../component.types";
import { ReactPortal } from "../ReactPortal/ReactPortal";
import { Modal } from "../Modal/Modal";
import { ColorBox } from "../ColorBox/ColorBox";
import { LabelTag } from "../LabelTag/LabelTag";
import { SelectLabel } from "../SelectLabel/SelectLabel";

export const NoteCard = ({
  title,
  noteText,
  id,
  updatedAt,
  isColorBoxVisible,
  setIsColorBoxVisible,
  index,
  bgColor,
  noteLabels,
  labelDialogState,
  setLabelDialogState,
}: NoteCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const { notes, setNotes, labels } = useData();
  const noteDate = new Date(updatedAt);

  return (
    <article
      className={`p-2 my-5 relative border-2 border-black rounded-lg max-w-3xl mx-auto whitespace-pre-wrap break-words bg-${bgColor}`}
    >
      <div onClick={() => setShowModal(true)} className="cursor-pointer">
        <h2 className="text-xl font-semibold text-xl mb-3 text-ellipsis	whitespace-nowrap	overflow-hidden mb-5">
          {title}
        </h2>

        <p>
          {noteText ? (
            noteText
          ) : (
            <span className="text-gray-400">Empty Note</span>
          )}
        </p>
      </div>

      <div className="flex mt-5 mb-2 mx-1 justify-between flex-col">
        <div className="my-2 flex">
          {noteLabels.map((label) => (
            <LabelTag currentLabel={label} noteId={id} />
          ))}
        </div>
        <div className="mb-3">
          <span>{`${noteDate.toLocaleDateString()} ${noteDate.toLocaleTimeString()}`}</span>
        </div>

        <div className={`flex text-2xl`}>
          <div className="relative mr-5 flex items-center">
            <button>
              <MdOutlineColorLens
                title="Background Color"
                onClick={() => {
                  setIsColorBoxVisible &&
                    setIsColorBoxVisible((c) => ({
                      ...c,
                      index: index,
                      isVisible: c.index === index ? !c.isVisible : true,
                    }));
                }}
              />
            </button>

            {isColorBoxVisible?.isVisible &&
              index === isColorBoxVisible.index && (
                <ColorBox id={id} bgColor={bgColor} />
              )}
          </div>
          <button className="mr-5">
            <MdOutlineArchive title="Archive" />
          </button>
          <button
            className="mr-5"
            onClick={() => handleNoteDelete(notes, setNotes, id)}
          >
            <MdOutlineDelete title="Delete" />
          </button>
          <div className="mr-5 flex items-center">
            <button>
              <MdOutlineNewLabel
                title="Add Label"
                onClick={() => {
                  setLabelDialogState((c) => ({
                    ...c,
                    index: index,
                    isVisible: c.index === index ? !c.isVisible : true,
                  }));
                }}
              />
            </button>

            {labelDialogState.isVisible && labelDialogState.index === index && (
              <SelectLabel noteLabels={noteLabels} id={id} labels={labels} />
            )}
          </div>
          <button className="mr-5">
            <MdOutlineContentCopy title="Make a copy" />
          </button>
        </div>
      </div>

      {showModal && (
        <ReactPortal>
          <Modal
            title={title}
            noteText={noteText}
            id={id}
            setShowModal={setShowModal}
          />
        </ReactPortal>
      )}
    </article>
  );
};
