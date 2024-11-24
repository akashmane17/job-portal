import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobs",
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    enum: ["Accepted", "Rejected", "Pending"],
    default: "Pending",
  },

  reason: { type: String },

  createdAt: { type: Date, default: Date.now },

  updatedAt: { type: Date },
});

const Application = mongoose.model("Application", ApplicationSchema);

export default Application;
