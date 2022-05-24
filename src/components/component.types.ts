export type TrashCardProps = {
  title?: string;
  noteText: string;
  id: string;
  bgColor: string;
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
  noteLabels: string[];
  labelDialogState: {
    isVisible: boolean;
    index: number;
  };
  setLabelDialogState: React.Dispatch<
    React.SetStateAction<{
      isVisible: boolean;
      index: number;
    }>
  >;
};
