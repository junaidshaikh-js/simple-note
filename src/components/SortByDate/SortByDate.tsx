type setSortBy = React.Dispatch<React.SetStateAction<string>>;

type SortByDateProps = {
  sortBy: string;
  setSortBy: setSortBy;
};

export const SortByDate = ({ sortBy, setSortBy }: SortByDateProps) => {
  const handleSortChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setSortBy: setSortBy
  ) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="my-5 text-xl text-right	mr-5">
      <div className="inline-block border py-1 px-2 border-black	">
        <label htmlFor="sort-by-date" className="mr-2">
          Sort by date
        </label>
        <select
          id="sort-by-date p-1"
          onChange={(e) => handleSortChange(e, setSortBy)}
          value={sortBy}
        >
          <option value="oldest first">Oldest First</option>
          <option value="latest first">Latest First</option>
        </select>
      </div>
    </div>
  );
};
