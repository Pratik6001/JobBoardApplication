const Job = require("../models/job");
const Form = require("../models/form");
const mongoose = require("mongoose");
exports.getJobData = async (req, res) => {
  try {
    const { search } = req.query;

    const cleanedSearch = search
      ? search.replace(/\+/g, " ").replace(/=$/, "").trim()
      : "";

    let filter = {};

    if (cleanedSearch) {
      const searchRegex = new RegExp(cleanedSearch, "i");
      filter = {
        $or: [
          { title: searchRegex },
          { company: searchRegex },
          { location: searchRegex },
          { description: searchRegex },
        ],
      };
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found." });
    }

    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching job data:", error);
    return res.status(500).json({
      message: "Something went wrong while fetching jobs.",
      error: error.message,
    });
  }
};

exports.applyNow = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { name, email } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Name and email or resume URL are required." });
    }
    // Validate Id
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }
    const form = new Form({ name, email, jobId });
    await form.save();

    return res
      .status(200)
      .json({ message: "Form submitted successfully", job: form });
  } catch (error) {
    console.error("Error submitting form:", error);
    return res.status(500).json({
      message: "Something went wrong while submitting the form.",
      error: error.message,
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Validate Id
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    // Attempt to delete the job
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job deleted successfully",
      job: deletedJob,
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Server error while deleting job" });
  }
};

exports.addJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;

    // Validate required fields
    if (!title || !company || !location || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new job
    const newJob = new Job({
      title,
      company,
      location,
      description,
    });

    await newJob.save();
    res.status(201).json({
      message: "Job added successfully.",
      job: newJob,
    });
  } catch (error) {
    console.error("Error adding job:", error);
    res.status(500).json({ message: "Sever error while adding job." });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Validate Id
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    const { title, company, location, description } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { title, company, location, description },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job: [updatedJob],
    });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Server error while updating job" });
  }
};

exports.formCount = async (req, res) => {
  try {
    const totalApplications = await Form.countDocuments(); // shorter syntax

    res.status(200).json({
      message: "Form count fetched successfully",
      totalApplications,
    });
  } catch (error) {
    console.error("Error fetching form count:", error);
    res.status(500).json({
      message: "Server error while fetching form count",
      error: error.message,
    });
  }
};
