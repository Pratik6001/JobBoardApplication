import React from "react";
import { Briefcase, Edit, MapPin, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";

dayjs.extend(relativeTime);

export default function JobCard1({ item, setActive, setEdit, setData }) {
  const token = localStorage.getItem("token");
  const handleChange = () => {
    setEdit(item);
    setActive({ editJob: true });
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this job?"
      );
      if (!confirmDelete) return;

      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setData((prev) => prev.filter((job) => job._id !== id));
      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="mx-auto p-5 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 leading-tight">
          {item.title || "N/A"}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleChange}
            className="p-2 rounded-full hover:bg-blue-50 transition"
            title="Edit Job"
          >
            <Edit className="w-5 h-5 text-gray-600 hover:text-blue-600" />
          </button>
          <button
            onClick={() => handleDelete(item._id)}
            className="p-2 rounded-full hover:bg-red-50 transition"
            title="Delete Job"
          >
            <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-500" />
          </button>
        </div>
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
      </div>
    </div>
  );
}
