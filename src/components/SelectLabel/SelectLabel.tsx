import React, { useEffect, useState } from "react";
import { useData } from "../../context";
import { LabelType, NoteType } from "../../context/context.type";
import { addNote } from "../../utils/server-request";

type SelectLabelProps = {
  noteLabels: string[];
  id: string;
  labels: LabelType[];
};

export const SelectLabel = ({ noteLabels, id, labels }: SelectLabelProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isChecked, setIsChecked] = useState(
    new Array(labels.length).fill(false)
  );

  useEffect(() => {
    const updatedCheckedState = labels.map(({ labelText }) =>
      noteLabels.includes(labelText) ? true : false
    );

    setIsChecked(updatedCheckedState);
  }, [labels, noteLabels]);

  const { notes, setNotes } = useData();
  const uid = localStorage.getItem("userId") || "";

  const filteredLabels = labels.filter(({ labelText }) => {
    return labelText.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddLabel = async (
    currentLabel: string,
    id: string,
    position: number
  ) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );

    setIsChecked(updatedCheckedState);

    let updatedNoteList: NoteType[];

    if (!isChecked[position]) {
      updatedNoteList = notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            labels: [...note.labels, currentLabel],
          };
        }
        return note;
      });
    } else {
      updatedNoteList = notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            labels: note.labels.filter((label) => label !== currentLabel),
          };
        }
        return note;
      });
    }
    await addNote(updatedNoteList, uid);
    setNotes(updatedNoteList);
  };

  return (
    <div className="absolute bg-black w-60 max-h-96 top-full text-xl p-2 py-4 px-4 text-white z-10">
      <span className="block my-2">Label Note</span>

      <div className="my-2">
        <label htmlFor="labelSearch" className="sr-only">
          Enter label Name
        </label>
        <input
          type="text"
          id="labelSearch"
          placeholder="Enter label name"
          className="border-b-2 border-black-300 w-full focus:outline-none bg-transparent placeholder:text-gray"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredLabels.length ? (
        filteredLabels.map(({ labelText, id: labelId }, index) => {
          return (
            <label className="block" key={labelId}>
              <input
                type="checkbox"
                className="mr-2"
                id={labelText}
                checked={isChecked[index]}
                onChange={() => handleAddLabel(labelText, id, index)}
              />
              {labelText}
            </label>
          );
        })
      ) : (
        <div className="flex items-center my-2">
          <span>No Label Found</span>
        </div>
      )}
    </div>
  );
};
