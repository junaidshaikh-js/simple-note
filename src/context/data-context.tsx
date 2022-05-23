import { createContext, useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

import { childrenType, LabelType, NoteType } from "./context.type";
import { db } from "../config/firebase-config";

type DataContextProviderProps = {
  children: childrenType;
};

type DataContextType = {
  notes: NoteType[];
  labels: LabelType[];
  isLoading: boolean;
  getNotes: () => Promise<void>;
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
  setLabels: React.Dispatch<React.SetStateAction<LabelType[]>>;
};

const DataContext = createContext({} as DataContextType);

const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [labels, setLabels] = useState<LabelType[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const uid = localStorage.getItem("userId");

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotes = async () => {
    try {
      setIsloading(true);
      const q = query(collection(db, "notes"), where("userId", "==", uid));
      const documents = await getDocs(q);

      const userDoc = documents.docs.map((doc) => doc.data())[0];

      setNotes(userDoc.notes);
      setLabels(userDoc.labels);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const value = {
    notes,
    labels,
    setNotes,
    setLabels,
    isLoading,
    getNotes,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

const useData = () => useContext(DataContext);

export { DataContextProvider, useData };
