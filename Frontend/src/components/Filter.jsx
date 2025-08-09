import { Search, X } from "lucide-react";
import { useState } from "react";

export default function JobFilter({ setQuery }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setQuery(value);
  };

  const clearSearch = () => {
    setInputValue("");
    setQuery("");
  };

  return (
    <div className="mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 w-full bg-gray-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search jobs, companies, or keywords..."
            className="w-full text-sm bg-transparent focus:outline-none"
          />
          {inputValue && (
            <button
              onClick={clearSearch}
              className="ml-2 p-1 rounded-full hover:bg-gray-200 transition"
              title="Clear Search"
            >
              <X size={16} className="text-gray-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
