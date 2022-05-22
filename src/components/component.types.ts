export type TrashCardProps = {
  title?: string;
  noteText: string;
  id: string;
};

export type NoteCardProps = {
  title?: string;
  noteText: string;
  id: string;
  updatedAt: number;
  isColorBoxVisible: {
    isVisible: boolean;
    index: null | number;
  };
  setIsColorBoxVisible: React.Dispatch<
    React.SetStateAction<{
      isVisible: boolean;
      index: number;
    }>
  >;
  index: number;
  bgColor: string;
};
