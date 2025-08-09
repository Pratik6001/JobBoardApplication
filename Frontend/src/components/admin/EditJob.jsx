import { X } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
export default function EditJob({ setActive, data, setData, getData }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const handleClose = () => {
    setActive({ editJob: false });
  };

  const [formData, setFormData] = useState({
    title: data?.title || "",
    company: data?.company || "",
    location: data?.location || "",
    description: data?.description || "",
  });

  // update form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/jobs/${data._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      const updatedJob = response.data.job;

      setData((prevJobs) =>
        prevJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
      );
      setMessage(response.data.message || "Job updated successfully");
      getData();
      setTimeout(() => {
        setActive({ editJob: false });
      }, 1000);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Error updating job");
    }
  };
  return (
    <div className=" bg-white shadow-md rounded-lg p-7 space-y-4">
      <div className="flex justify-between w-full">
        <div className="space-y-1 w-full">
          <h1 className=" font-semibold text-xl text-center">Edit Job</h1>
          <p className=" text-gray-600 text-center">
            Update the job details below.
          </p>
        </div>
        <X
          onClick={handleClose}
          className=" cursor-pointer p-1 rounded-full hover:bg-red-50 transition hover:text-red-500"
        />
      </div>
      {message && <p className="text-green-600 font-medium">{message}</p>}
      {error && <p className="text-red-600 font-medium">{error}</p>}
      <form onSubmit={handleUpdate} action="" className=" space-y-3">
        <label className="block font-semibold" htmlFor="jobtitle">
          Job Title *
        </label>
        <input
          type="text"
          name="title"
          placeholder=""
          value={formData.title}
          onChange={handleChange}
          className=" p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />

        <label className="block font-semibold" htmlFor="jobtitle">
          Company *
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder=""
          className=" p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />

        <label className="block font-semibold" htmlFor="jobtitle">
          Location *
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder=""
          className=" p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />

        <label className="block font-semibold" htmlFor="jobtitle">
          Job Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter job description"
          className=" p-3 border h-28 border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
        />

        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="flex gap-2 justify-center w-full items-center p-4  pt-2 pb-2  cursor-pointer  bg-blue-600  text-white rounded shadow font-semibold "
          >
            <span className=" font-semibold">Update Job</span>
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-full cursor-pointer font-semibold bg-black rounded text-white sm:w-auto border px-6 py-2 text-center"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
