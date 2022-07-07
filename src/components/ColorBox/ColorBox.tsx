import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import toast from "react-hot-toast";

import { useData } from "../../context";
import { addNote } from "../../utils/server-request";

type ColorBoxProps = {
  id: string;
  bgColor: string;
};

const colors = [
  { colorName: "White", value: "#fff" },
  { colorName: "Red", value: "#c35551" },
  { colorName: "Yellow", value: "#b8ae3d" },
  { colorName: "Green", value: "#4e902b" },
  { colorName: "Purple", value: "#A272CA" },
];

export const ColorBox = ({ id, bgColor }: ColorBoxProps) => {
  const [isChangingColor, setIsChangingColor] = useState(false);

  const { notes, setNotes } = useData();

  const uid = localStorage.getItem("userId") || "";

  const handleColorClick = async (color: string) => {
    if (bgColor === color) return;

    setIsChangingColor(true);

    try {
      const updatedNotesList = notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            bgColor: color,
          };
        }

        return note;
      });

      await addNote(updatedNotesList, uid);
      setNotes(updatedNotesList);
      toast.success(`Note background changed to ${color}`);
      setIsChangingColor(false);
    } catch (error) {
      console.log(error);
      setIsChangingColor(false);
    }
  };

  return (
    <section className="flex absolute top-full mt-2 bg-white p-3 border border-black rounded z-10">
      {colors.map((_color) => {
        return (
          <div
            className={`h-7 w-7 mr-2 border	border-black rounded-full cursor-pointer flex items-center justify-center ${
              isChangingColor ? "pointer-events-none" : "pointer-events-auto"
            }`}
            tabIndex={0}
            title={_color.colorName}
            role="button"
            onClick={() => handleColorClick(_color.value)}
            style={{
              backgroundColor: _color.value,
            }}
          >
            {bgColor === _color.value && (
              <AiOutlineCheck
                color={bgColor === "#fff" ? "black" : "white"}
                fontSize="1.2rem"
              />
            )}
          </div>
        );
      })}
    </section>
  );
};
