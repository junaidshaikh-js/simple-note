import { SetStateAction, useRef, useState } from "react";
import { MdOutlineLabelImportant, MdDelete } from "react-icons/md";
import {
  AiOutlineEdit,
  AiFillCheckCircle,
  AiOutlineCheck,
} from "react-icons/ai";
import { v4 as uuid } from "uuid";

import { useData } from "../../context";
import { updateLabel } from "../../utils/server-request";
import { LabelType } from "../../context/context.type";
import toast from "react-hot-toast";

type EditLabelModalProps = {
  setShowLabelModal: React.Dispatch<SetStateAction<boolean>>;
};

export const EditLabelModal = ({ setShowLabelModal }: EditLabelModalProps) => {
  const [labelValue, setLabelValue] = useState("");
  const [labelError, setLabelError] = useState("");
  const [renameLabel, setRenameLabel] = useState({
    isRenaming: false,
    index: -1,
  });
  const inputRef = useRef<HTMLInputElement>(null!);

  const { labels, setLabels } = useData();
  const uid = localStorage.getItem("userId") || "";

  const isLabelExist = (label: string, labelList: LabelType[]) => {
    for (let label of labels) {
      if (label.labelText === labelValue) {
        return true;
      }
    }

    return false;
  };

  const updateRenameState = (state: boolean, index: number) => {
    setRenameLabel({
      isRenaming: state,
      index: index,
    });
  };

  const handleLabelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!labelValue) return;

    if (isLabelExist(labelValue, labels)) {
      setLabelError("Label already exists");
      return;
    }

    const updatedLabelList = [
      ...labels,
      {
        id: uuid(),
        labelText: labelValue,
      },
    ];

    updateLabel(updatedLabelList, uid);
    setLabels(updatedLabelList);
    setLabelValue("");
  };

  const handleLabelRename = async (
    id: string,
    oldLabelValue: string,
    updatedName: string
  ) => {
    if (oldLabelValue === updatedName || updatedName === "") {
      updateRenameState(false, -1);
      setLabelValue("");
      return;
    }

    if (isLabelExist(labelValue, labels)) {
      toast.error("Label already exist");
      return;
    }

    const updatedLabelList = labels.map((label) => {
      if (label.id === id) {
        return {
          ...label,
          labelText: updatedName,
        };
      }

      return label;
    });

    updateLabel(updatedLabelList, uid);
    setLabels(updatedLabelList);
    updateRenameState(false, -1);
    setLabelValue("");
  };

  const handleLabelDelete = (id: string) => {
    const updatedLabelList = labels.filter((label) => label.id !== id);
    updateLabel(updatedLabelList, uid);
    updateRenameState(false, -1);
    setLabelValue("");
    setLabels(updatedLabelList);
  };

  return (
    <div
      className="fixed inset-0 bg-wrapper flex items-center	justify-center z-30"
      onClick={() => setShowLabelModal((s) => !s)}
    >
      <section
        className="bg-white p-3 rounded max-width-sm max-h-96"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-h-72 my-2 overflow-y-auto">
          <h1 className="font-bold my-2">Edit labels</h1>
          <div className="flex items-center justify-center">
            <form className="flex" onSubmit={(e) => handleLabelSubmit(e)}>
              <div>
                <input
                  type="text"
                  placeholder="Create new label"
                  className="mr-2 p-1"
                  value={renameLabel.isRenaming ? "" : labelValue}
                  onChange={(e) => setLabelValue(e.target.value)}
                />
                {labelError && (
                  <span className="italic text-red-600 my-4 block">
                    {renameLabel.isRenaming || labelError}
                  </span>
                )}
              </div>

              <button type="submit" className="self-start	mt-1.5">
                <AiFillCheckCircle
                  fontSize="1.2rem"
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
          <div>
            {labels.map((label, index) => {
              return renameLabel.isRenaming && renameLabel.index === index ? (
                <div className="flex items-center mx-5 my-5">
                  <MdDelete
                    className="mr-2"
                    fontSize="1.3rem"
                    title="Delete Label"
                    onClick={() => handleLabelDelete(label.id)}
                  />
                  <div className="w-full mr-4">
                    <input
                      type="text"
                      ref={inputRef}
                      placeholder="Enter label name"
                      className="border-b-2 border-black-300 w-full focus:outline-none"
                      value={labelValue}
                      onChange={(e) => setLabelValue(e.target.value)}
                    />
                  </div>
                  <AiOutlineCheck
                    className="ml-auto cursor-pointer"
                    fontSize="1.3rem"
                    title="Rename label"
                    onClick={() => {
                      handleLabelRename(label.id, label.labelText, labelValue);
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center mx-5 my-5">
                  <MdOutlineLabelImportant className="mr-2" fontSize="1.2rem" />
                  <span className="border-b-2 border-transparent block mr-4 truncate">
                    {label.labelText}
                  </span>
                  <AiOutlineEdit
                    className="ml-auto cursor-pointer"
                    fontSize="1.2rem"
                    title="Rename label"
                    onClick={() => {
                      updateRenameState(true, index);
                      setLabelValue(label.labelText);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-right border-t bg-white w-full">
          <button
            className="mr-5 mt-2 py-2 px-3 rounded hover:bg-grey"
            onClick={() => setShowLabelModal(false)}
          >
            Done
          </button>
        </div>
      </section>
    </div>
  );
};
