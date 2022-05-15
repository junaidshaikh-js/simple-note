import React from "react";

export type childrenType = React.ReactNode;
export type authFunction = () => Promise<void>;
export type NoteType = {
  id: string;
  title: string;
  noteText: string;
  dateCreated: Date;
  isArchived: boolean;
  isInTrash: boolean;
  bgColor: string;
  labels: string[];
  updatedAt: Date;
};
