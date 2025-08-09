import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import JobCard from "./JobCard";
import Filter from "./Filter";
import axios from "axios";
export default function Home() {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (currentSearch !== query) {
      setQuery(currentSearch);
    }
  }, [searchParams]);

  useEffect(() => {
    const getData = async () => {
      try {
        const cleanedQuery = query
          ? query.replace(/\+/g, " ").replace(/=$/, "").trim()
          : "";

        const url = `${import.meta.env.VITE_SERVER_URL}/jobs`;
        const response = await axios.get(url, {
          params: {
            search: query || undefined,
          },
        });
        const job = response.data;

        setData(job);
      } catch (error) {
        console.log(
          "Error fetching jobs:",
          error.response?.data || error.message
        );
        setData([]);
      }
    };
    getData();
  }, [query]);

  const handleSetQuery = (newQuery) => {
    setQuery(newQuery);
    if (newQuery) {
      setSearchParams({ search: newQuery });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="space-y-4 ">
      <Filter setQuery={handleSetQuery} />
      <p className="p-4 font-semibold rounded-md  mx-auto ">
        Showing <span className="text-blue-600">{data.length}</span> jobs
      </p>

      {data && data.length > 0 ? (
        data.map((item, index) => <JobCard key={index} item={item} />)
      ) : (
        <p className="text-center font-semibold text-xl">No results found</p>
      )}
    </div>
  );
}
