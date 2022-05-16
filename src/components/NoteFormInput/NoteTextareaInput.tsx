type NoteTextareaInputProps = {
  refObject: React.MutableRefObject<HTMLTextAreaElement>;
  value: string;
  changeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  clickHandler?: () => void;
};

export const NoteTextareaInput = ({
  refObject,
  value,
  changeHandler,
  clickHandler,
}: NoteTextareaInputProps) => {
  return (
    <div>
      <label htmlFor="note" className="sr-only">
        Take a note
      </label>

      <textarea
        id="note"
        rows={1}
        ref={refObject}
        placeholder="Take a note..."
        className="bg-transparent outline-none border-none my-2 p-1 w-full  overflow-hidden	 resize-none placeholder:text-black placeholder:text-lg"
        value={value}
        name="noteText"
        onChange={changeHandler}
        onClick={clickHandler}
      />
    </div>
  );
};
