import Image from "next/image";
import JobModel from "@/models/JobModel";

interface JobCardProps {
  addFilter: (filter: string) => void;
}

export default function JobCard({
  id,
  company,
  logo,
  new: isNew,
  featured,
  position,
  role,
  level,
  postedAt,
  contract,
  location,
  languages,
  tools,
  addFilter,
}: JobModel & JobCardProps) {
  return (
    <div className="flex flex-col lg:flex-row job-card w-full items-start lg:items-center rounded-md bg-white shadow-lg p-4 justify-between gap-3 cursor-pointer">
      <div className="flex flex-col lg:flex-row gap-4 -mt-12 lg:mt-0">
        <Image
          src={logo}
          alt="Logo"
          width={1000}
          height={1000}
          className="w-18 h-18 lg:w-24 lg:h-24"
        />
        <div className="flex flex-col justify-center gap-1">
          <div className="flex flex-wrap items-center gap-4">
            <h4 className="text-desaturatedDarkCyan font-bold">{company}</h4>
            <div className="flex items-center gap-2">
              {isNew && (
                <p className="bg-desaturatedDarkCyan text-white text-[12px] font-bold px-2 pt-1 rounded-full">
                  NEW!
                </p>
              )}
              {featured && (
                <p className="bg-veryDarkGrayishCyan text-white text-[12px] font-bold px-2 pt-1 rounded-full">
                  FEATURED
                </p>
              )}
            </div>
          </div>

          <h3 className="text-veryDarkCyan font-bold text-[20px] hover:text-desaturatedDarkCyan">
            {position}
          </h3>

          <div className="flex gap-3 items-center">
            <p className="text-darkGrayishCyan text-[14px]">{postedAt}</p>
            <div className="h-1 w-1 bg-darkGrayishCyan rounded-full"></div>
            <p className="text-darkGrayishCyan text-[14px]">{contract}</p>
            <div className="h-1 w-1 bg-darkGrayishCyan rounded-full"></div>
            <p className="text-darkGrayishCyan text-[14px]">{location}</p>
          </div>
        </div>
      </div>

      <div className="flex lg:hidden h-[1px] w-full bg-darkGrayishCyan/30"></div>

      <div className="flex flex-wrap gap-2">
        <button
          className="bg-lightGrayishCyan2 text-desaturatedDarkCyan font-medium px-2 pt-1 rounded-sm cursor-pointer hover:bg-desaturatedDarkCyan hover:text-lightGrayishCyan"
          onClick={() => addFilter(role)}
        >
          {role}
        </button>
        <button
          className="bg-lightGrayishCyan2 text-desaturatedDarkCyan font-medium px-2 pt-1 rounded-sm cursor-pointer hover:bg-desaturatedDarkCyan hover:text-lightGrayishCyan"
          onClick={() => addFilter(level)}
        >
          {level}
        </button>
        {[...languages, ...tools].map((item, index) => (
          <button
            key={index}
            className="bg-lightGrayishCyan2 text-desaturatedDarkCyan font-medium px-2 pt-1 rounded-sm cursor-pointer hover:bg-desaturatedDarkCyan hover:text-lightGrayishCyan"
            onClick={() => addFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
