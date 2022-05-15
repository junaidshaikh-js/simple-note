type TitleInputProps = {
  value?: string;
  changeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const TitleInput = ({ value, changeHandler }: TitleInputProps) => {
  return (
    <div>
      <label htmlFor="title" className="sr-only">
        Title
      </label>
      <input
        type="text"
        id="title"
        placeholder="Title"
        className="bg-transparent border-none outline-none my-2 p-1 w-full  placeholder:text-black placeholder:text-xl font-semibold text-xl"
        name="title"
        value={value}
        onChange={changeHandler}
      />
    </div>
  );
};
