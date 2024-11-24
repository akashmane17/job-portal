import mongoose from "mongoose";

const JobsSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: { type: String, required: true },

  companyName: { type: String, required: true },

  tags: { type: String },

  skills: { type: String, required: true },

  description: { type: String, required: true },

  jobCategory: { type: String, required: true },

  jobType: {
    type: String,
    enum: ["Full-Time", "Remote", "Hybrid"],
    required: true,
  },

  salary: { type: String, required: true },

  experience: { type: String, required: true },

  customFields: [
    {
      label: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
});

const Jobs = mongoose.model("Jobs", JobsSchema);
export default Jobs;
