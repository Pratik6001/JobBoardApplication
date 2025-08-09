import { X } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
export default function AddNewJob({
  setActive,
  setData,
  fetchApplications,
  getData,
}) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleClose = () => {
    setActive({ addNewJob: false });
  };

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });

  // update form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleAdd = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/jobs`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const newJob = response.data.job;
      setData((prevJobs) => [newJob, ...prevJobs]); // Update prev data state
      setMessage(response.data.message || "Job added successfully");
      getData();
      fetchApplications();
      setTimeout(() => {
        setActive({ addNewJob: false });
      }, 1000);
      setFormData({ title: "", company: "", location: "", description: "" });
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Error adding job");
    }
  };

  return (
    <div className=" bg-white shadow-md rounded-lg p-7 space-y-4">
      <div className="flex justify-between w-full">
        <div className="space-y-1">
          <h1 className=" font-semibold text-xl">Add New Job</h1>
          <p className=" text-gray-600">
            Fill in the details for the new job posting.
          </p>
        </div>
        <X
          onClick={handleClose}
          className=" cursor-pointer p-1 rounded-full hover:bg-red-50 transition hover:text-red-500"
        />
      </div>

      {message && <p className="text-green-600 font-medium">{message}</p>}
      {error && <p className="text-red-600 font-medium">{error}</p>}
      <form action="" onSubmit={handleAdd} className=" space-y-3">
        <label className="block font-semibold" htmlFor="jobtitle">
          Job Title *
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter job title"
          value={formData.title}
          onChange={handleChange}
          required
          className=" p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />

        <label className="block font-semibold" htmlFor="jobtitle">
          Company *
        </label>
        <input
          type="text"
          name="company"
          placeholder="Enter company name"
          value={formData.company}
          onChange={handleChange}
          required
          className=" p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />

        <label className="block font-semibold" htmlFor="jobtitle">
          Location *
        </label>
        <input
          type="text"
          name="location"
          placeholder="Enter company location"
          value={formData.location}
          onChange={handleChange}
          required
          className=" p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />

        <label className="block font-semibold" htmlFor="jobtitle">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter job description"
          value={formData.description}
          onChange={handleChange}
          required
          maxLength={300}
          className=" p-3 border h-28 border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition "
        />

        <div className="flex justify-between gap-4">
          <button className="flex gap-4 justify-center w-full items-center p-4  pt-2 pb-2  cursor-pointer  bg-blue-600  text-white rounded shadow font-semibold ">
            <span className=" font-semibold">Add New Job</span>
          </button>
          <button
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
