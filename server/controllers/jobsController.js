import asyncHandler from "../middlewares/asyncHandler.js";
import Jobs from "../models/jobsModel.js";
import User from "../models/userModel.js";
import Application from "../models/applicationModel.js";
import sendEmail from "../utils/email.js";

// POST: Apply for Job
export const applyJob = asyncHandler(async (req, res) => {
  const body = req.body;

  const applicationExists = await Application.findOne({
    user: body.user,
    job: body.job,
  });

  if (applicationExists) {
    res.status(400).json({ message: "Already applied" });
    return;
  }

  const fields = {
    admin: body.admin,
    user: body.user,
    job: body.job,
  };

  const application = await Application.create(fields);

  if (application) {
    const user = await User.find({ _id: body.user });
    const admin = await User.find({ _id: body.admin });

    res.status(201).json({ message: "Applied successfully" });
    if (user && admin) {
      const { email: userEmail, name: userName } = user[0];
      const { email: adminEmail, name: adminName } = admin[0];

      // send email to admin
      sendEmail(
        adminEmail,
        "User Applied to the job post",
        `Dear Admin: ${adminName}, User: ${userName} has shown interest for the job you posted`
      );

      // send email to user
      sendEmail(
        userEmail,
        "Application submited",
        `Dear ${userName} your application for the job post has been submited`
      );
    }
  } else {
    res.status(400).json({ message: "Failed to apply" });
  }
});

// POST: Create A new Job post
export const createJob = asyncHandler(async (req, res) => {
  const body = req.body;

  const createdJob = await Jobs.create(body);

  if (createdJob) {
    res.status(201).json({ message: "Job created successfully" });
  } else {
    res.status(400).json({ message: "Failed to create Job" });
  }
});

// PUT: Edit Job post
export const updateJob = asyncHandler(async (req, res) => {
  const body = req.body;
  const { _id, ...updateFields } = body;

  const updatedJob = await Jobs.findByIdAndUpdate(
    _id,
    { $set: updateFields },
    { new: true }
  );

  if (updatedJob) {
    res
      .status(200)
      .json({ message: "Job updated successfully", job: updatedJob });
  } else {
    res.status(404).json({ message: "Job not found" });
  }
});

// GET: all job posts
export const getAllJobs = asyncHandler(async (req, res) => {
  const user = req.user;
  let jobs = null;

  if (user.role === "Admin") {
    jobs = await Jobs.find({ admin: user._id }).populate("admin", "_id");
  } else {
    jobs = await Jobs.find().populate("admin", "_id");
  }

  res.status(200).json(jobs);
});

// GET: Job post by id
export const getJobById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let jobs = null;

  jobs = await Jobs.find({ _id: id });

  res.status(200).json(jobs);
});

// GET: all user applied job posts
export const getAppliedJobs = asyncHandler(async (req, res) => {
  const user = req.user;
  let jobs = [];

  jobs = await Application.find({ user: user.session.userid }).populate(
    "job",
    "title companyName"
  );

  res.status(200).json(jobs);
});

// GET: all Applications for job post
export const getApplications = asyncHandler(async (req, res) => {
  const user = req.user;
  let jobs = [];

  jobs = await Application.find({ admin: user.session.userid })
    .populate({
      path: "job",
      select: "title companyName skills",
    })
    .populate({
      path: "user",
      select: "name skills experience pdfLink",
    });

  // calculate relevancy based on skills
  jobs = jobs.map((job) => {
    const jobObj = job.toObject();
    if (jobObj.job?.skills && jobObj.user?.skills) {
      const jobSkills = jobObj.job.skills
        .split(",")
        .map((skill) => skill.trim().toLowerCase());
      const userSkills = jobObj.user.skills
        .split(",")
        .map((skill) => skill.trim().toLowerCase());

      const matchedSkills = jobSkills.filter((skill) =>
        userSkills.includes(skill)
      );
      const matchPercentage = (
        (matchedSkills.length / jobSkills.length) *
        100
      ).toFixed(2);

      jobObj.relevancy = Number(matchPercentage);
    } else {
      jobObj.relevancy = 0;
    }

    return jobObj;
  });

  res.status(200).json(jobs);
});

// PUT: Respond to the application (accept or reject)
export const respondToApplication = asyncHandler(async (req, res) => {
  const { _id, status, reason } = req.body;

  const application = await Application.findById(_id);
  if (!application) {
    return res.status(404).json({ message: "Application not found." });
  }

  if (status === "Accepted") {
    application.status = "Accepted";
    application.reason = undefined;
  } else if (status === "Rejected") {
    if (!reason) {
      return res
        .status(400)
        .json({ message: "Reason is required for rejection." });
    }
    application.status = "Rejected";
    application.reason = reason;
  } else {
    return res.status(400).json({ message: "Invalid status provided." });
  }

  await application.save();

  const user = await User.find({ _id: application.user });
  const { email: userEmail, name: userName } = user[0];

  // send email to user
  sendEmail(
    userEmail,
    "Application Result",
    `Dear ${userName} your application for the job post has been ${status}`
  );

  res
    .status(200)
    .json({ message: "Application updated successfully.", application });
});
