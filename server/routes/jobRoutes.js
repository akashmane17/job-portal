import express from "express";
const router = express.Router();
import { requireAdmin, requireUser } from "../middlewares/requireUser.js";
import {
  applyJob,
  createJob,
  getAllJobs,
  getApplications,
  getAppliedJobs,
  getJobById,
  respondToApplication,
  updateJob,
} from "../controllers/jobsController.js";

// create job post
router.post("/create", requireAdmin, createJob);

// edit job post
router.put("/edit", requireAdmin, updateJob);

// get all job posts
router.get("/all", requireUser, getAllJobs);

// get jobs applied by a user
router.get("/applied-jobs", requireUser, getAppliedJobs);

// apply to a job
router.post("/apply", requireUser, applyJob);

// applications of the job posts
router.get("/applications", requireAdmin, getApplications);

// respond to job post (accept or reject)
router.post("/respond", requireAdmin, respondToApplication);

// get job post by id
router.get("/:id", requireUser, getJobById);

export default router;
