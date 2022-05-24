import { doc, updateDoc } from "firebase/firestore";

import { db } from "../config/firebase-config";
import { LabelType, NoteType } from "../context/context.type";

export const addNote = async (notesList: NoteType[], uid: string) => {
  try {
    const docRef = doc(db, "notes", uid);
    await updateDoc(docRef, {
      notes: notesList,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateLabel = async (labelList: LabelType[], uid: string) => {
  try {
    const docRef = doc(db, "notes", uid);

    await updateDoc(docRef, {
      labels: labelList,
    });
  } catch (error) {
    console.log(error);
  }
};
