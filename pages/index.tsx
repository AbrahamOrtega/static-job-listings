import JobCard from "@/components/JobCard";
import Image from "next/image";
import getData from "@/services/Data";
import { useEffect, useState } from "react";
import JobModel from "@/models/JobModel";
import Filter from "@/components/Filter";

interface Filter {
  role: string[];
  level: string[];
  languages: string[];
  tools: string[];
}

export default function Home() {
  const [data, setData] = useState<JobModel[]>([]);
  const [filters, setFilters] = useState<Filter>({
    role: [],
    level: [],
    languages: [],
    tools: [],
  });
  const [dataFiltered, setDataFiltered] = useState<JobModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(
        (result as any[]).map((job) => ({
          ...job,
          id: String(job.id),
        }))
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    const hasFilters =
      filters.role.length > 0 ||
      filters.level.length > 0 ||
      filters.languages.length > 0 ||
      filters.tools.length > 0;

    if (hasFilters) {
      const filteredData = data.filter((job) => {
        const roleMatch =
          filters.role.length === 0 || filters.role.includes(job.role);
        const levelMatch =
          filters.level.length === 0 || filters.level.includes(job.level);
        const languagesMatch =
          filters.languages.length === 0 ||
          job.languages.some((lang) => filters.languages.includes(lang));
        const toolsMatch =
          filters.tools.length === 0 ||
          job.tools.some((tool) => filters.tools.includes(tool));
        return roleMatch && levelMatch && languagesMatch && toolsMatch;
      });
      setDataFiltered(filteredData);
    } else {
      setDataFiltered(data);
    }
  }, [filters, data]);

  const addFilter = (filter: string) => {
    setFilters((prev) => {
      let newFilters = { ...prev };
      // Check if filter already exists in any category
      if (
        newFilters.role.includes(filter) ||
        newFilters.level.includes(filter) ||
        newFilters.languages.includes(filter) ||
        newFilters.tools.includes(filter)
      ) {
        return newFilters;
      }
      // Find the filter type by searching in the data
      const job = data.find(
        (job) =>
          job.role === filter ||
          job.level === filter ||
          job.languages.includes(filter) ||
          job.tools.includes(filter)
      );
      if (job) {
        if (job.role === filter) {
          newFilters.role.push(filter);
        } else if (job.level === filter) {
          newFilters.level.push(filter);
        } else if (job.languages.includes(filter)) {
          newFilters.languages.push(filter);
        } else if (job.tools.includes(filter)) {
          newFilters.tools.push(filter);
        }
      }
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      role: [],
      level: [],
      languages: [],
      tools: [],
    });
  };

  const removeFilter = (filter: string) => {
    setFilters((prev) => {
      let newFilters = { ...prev };
      newFilters.role = newFilters.role.filter((f) => f !== filter);
      newFilters.level = newFilters.level.filter((f) => f !== filter);
      newFilters.languages = newFilters.languages.filter((f) => f !== filter);
      newFilters.tools = newFilters.tools.filter((f) => f !== filter);
      return newFilters;
    });
  };

  return (
    <div className="flex flex-col w-full items-center">
      <Image
        src="/images/bg-header-desktop.svg"
        alt="Logo"
        width={1000}
        height={1000}
        className="object-cover w-full h-32 bg-desaturatedDarkCyan hidden lg:flex"
      />
      <Image
        src="/images/bg-header-mobile.svg"
        alt="Logo"
        width={1000}
        height={1000}
        className="object-cover w-full h-24 bg-desaturatedDarkCyan flex lg:hidden"
      />

      <div className="flex flex-col items-center justify-center w-full px-8 pb-16">
        <div className="flex flex-col w-full max-w-4xl">
          <Filter
            filters={filters}
            removeFilter={removeFilter}
            clearFilters={clearFilters}
          />
          <div className="flex flex-col w-full gap-12 lg:gap-6 mt-4">
            <div className="job-card invisible"></div>
            {dataFiltered.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                company={job.company}
                logo={job.logo}
                position={job.position}
                postedAt={job.postedAt}
                contract={job.contract}
                location={job.location}
                languages={job.languages}
                tools={job.tools}
                new={job.new}
                featured={job.featured}
                role={job.role}
                level={job.level}
                addFilter={addFilter}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
