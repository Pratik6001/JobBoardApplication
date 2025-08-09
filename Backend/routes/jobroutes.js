const express = require("express");
const router = express.Router();
const controller = require("../controllers/jobController");
const { authenticateToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

// GET all job listings (user access);
router.get("/jobs", controller.getJobData);
router.get("/form-count", controller.formCount);

// POST a new job listing (admin access)
router.post(
  "/jobs",
  authenticateToken,
  authorizeRoles("admin"),
  controller.addJob
);

// UPDATE a job listing by Id (admin access)
router.put(
  "/jobs/:id",
  authenticateToken,
  authorizeRoles("admin"),
  controller.updateJob
);

// DELETE a job listing by Id  (admin access)
router.delete(
  "/jobs/:id",
  authenticateToken,
  authorizeRoles("admin"),
  controller.deleteJob
);

// APPLY to a job by job Id (user access)
router.post("/apply/:jobId", controller.applyNow);

module.exports = router;
