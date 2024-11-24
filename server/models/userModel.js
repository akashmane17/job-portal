import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["Admin", "User"],
    required: true,
  },

  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  phoneNumber: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  otp: { key: { type: String }, exp: { type: Date } },

  skills: { type: String, required: true },

  experience: { type: Number, required: true },

  pdfLink: { type: String, default: "no-link" },

  createdAt: { type: Date, default: Date.now },
});

// Compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt passwords before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);

export default User;
