import React from "react";
import { Briefcase, MapPin } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

export default function JobCard({ item }) {
  return (
    <div className="mx-auto p-5 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 leading-tight">
          {item.title || "N/A"}
        </h2>
      </div>

      <div className="flex flex-wrap text-sm text-gray-600 gap-4 mb-4">
        <div className="flex items-center gap-1">
          <Briefcase size={16} className="text-blue-600" />
          <span>{item.company || "N/A"}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={16} className="text-green-600" />
          <span>{item.location || "N/A"}</span>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-5 line-clamp-3">
        {item.description || "N/A"}
      </p>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <span className="text-xs text-gray-500">
          Posted{" "}
          {item?.createdAt && !isNaN(new Date(item.createdAt).getTime())
            ? dayjs(new Date(item.createdAt)).fromNow()
            : "N/A"}
        </span>
        <Link
          to={`/apply/${item._id}`}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 font-semibold text-white text-sm rounded-lg transition"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}
