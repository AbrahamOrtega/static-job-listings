interface FilterProps {
  filters: {
    role: string[];
    level: string[];
    languages: string[];
    tools: string[];
  };
  removeFilter: (filter: string) => void;
  clearFilters: () => void;
}

export default function Filter({
  filters,
  removeFilter,
  clearFilters,
}: FilterProps) {
  return (
    <div
      className={`p-4 bg-white shadow-lg justify-between rounded-md -mt-8 ${
        filters.role.length === 0 &&
        filters.level.length === 0 &&
        filters.languages.length === 0 &&
        filters.tools.length === 0
          ? "hidden"
          : "flex"
      }`}
    >
      <div className="flex flex-wrap gap-3">
        {filters.role.map((filter) => (
          <div
            key={filter}
            className="flex items-center bg-lightGrayishCyan text-desaturatedDarkCyan font-medium pl-2 rounded-sm hover:bg-lightGrayishCyan hover:text-desaturatedDarkCyan"
          >
            {filter}
            <span
              className="flex px-2 ml-2 text-[18px] font-bold bg-desaturatedDarkCyan text-white cursor-pointer rounded-r-md hover:bg-veryDarkGrayishCyan"
              onClick={() => removeFilter(filter)}
            >
              x
            </span>
          </div>
        ))}

        {filters.level.map((filter) => (
          <div
            key={filter}
            className="flex items-center bg-lightGrayishCyan text-desaturatedDarkCyan font-medium pl-2 rounded-sm hover:bg-lightGrayishCyan hover:text-desaturatedDarkCyan"
          >
            {filter}
            <span
              className="flex px-2 ml-2 text-[18px] font-bold bg-desaturatedDarkCyan text-white cursor-pointer rounded-r-md hover:bg-veryDarkGrayishCyan"
              onClick={() => removeFilter(filter)}
            >
              x
            </span>
          </div>
        ))}

        {filters.languages.map((filter) => (
          <div
            key={filter}
            className="flex items-center bg-lightGrayishCyan text-desaturatedDarkCyan font-medium pl-2 rounded-sm hover:bg-lightGrayishCyan hover:text-desaturatedDarkCyan"
          >
            {filter}
            <span
              className="flex px-2 ml-2 text-[18px] font-bold bg-desaturatedDarkCyan text-white cursor-pointer rounded-r-md hover:bg-veryDarkGrayishCyan"
              onClick={() => removeFilter(filter)}
            >
              x
            </span>
          </div>
        ))}

        {filters.tools.map((filter) => (
          <div
            key={filter}
            className="flex items-center bg-lightGrayishCyan text-desaturatedDarkCyan font-medium pl-2 rounded-sm hover:bg-lightGrayishCyan hover:text-desaturatedDarkCyan"
          >
            {filter}
            <span
              className="flex px-2 ml-2 text-[18px] font-bold bg-desaturatedDarkCyan text-white cursor-pointer rounded-r-md hover:bg-veryDarkGrayishCyan"
              onClick={() => removeFilter(filter)}
            >
              x
            </span>
          </div>
        ))}
      </div>
      <button
        className="text-darkGrayishCyan hover:text-desaturatedDarkCyan hover:underline cursor-pointer"
        onClick={clearFilters}
      >
        Clear
      </button>
    </div>
  );
}
