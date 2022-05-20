import React from "react";

export type childrenType = React.ReactNode;
export type authFunction = () => Promise<void>;
export type NoteType = {
  id: string;
  title?: string;
  noteText: string;
  dateCreated: number;
  isArchived: boolean;
  isInTrash: boolean;
  bgColor: string;
  labels: string[];
  updatedAt: number;
};
