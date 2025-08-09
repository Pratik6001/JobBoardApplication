import axios from "axios";
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function JobApplicationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    resumeUrl: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email) {
      setError("Please fill out all the required fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/apply/${id}`,
        {
          name: form.name,
          email: form.email,
          // resumeUrl: form.resumeUrl, // assuming backend accepts this
        },
        { withCredentials: true }
      );
      setSuccess(response.data.message || "Form submitted successfully.");
      setTimeout(() => {
        navigate("/");
      }, 1000);

      setForm({ name: "", email: "", resumeUrl: "" });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 sm:p-8 bg-white rounded-lg shadow-md ">
      <h2 className="text-lg sm:text-xl font-semibold mb-1">
        Submit Your Application
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Fill out the form below to apply for this job. All fields marked with *
        are required.
      </p>

      <form className="space-y-4" onSubmit={formSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            required
            className=" p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
            className=" p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resume URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="resumeUrl"
            placeholder="https://drive.google.com/..."
            value={form.resumeUrl}
            onChange={handleChange}
            className=" p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          />
        </div>

        <div className="flex w-full  gap-4">
          <button
            type="submit"
            className="w-full cursor-pointer font-semibold bg-blue-600 text-white px-6 py-2 rounded"
          >
            Submit Application
          </button>
          <Link
            to={`/`}
            className="w-full cursor-pointer flex justify-center items-center  font-semibold bg-black rounded text-white sm:w-auto border px-6 py-2 text-center"
          >
            Cancel
          </Link>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </form>
    </div>
  );
}
