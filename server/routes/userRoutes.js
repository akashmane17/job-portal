import express from "express";
import {
  authUser,
  changePassword,
  getCurrentUser,
  getUserProfile,
  logoutUser,
  registerUser,
  sendOtp,
  uploadUserResume,
} from "../controllers/userController.js";
const router = express.Router();
import { requireUser } from "../middlewares/requireUser.js";
import multer from "multer";
import { fileFilter, storage } from "../utils/uploadFile.js";

// For single file upload
const singleUpload = multer({ storage: storage, fileFilter: fileFilter });

// create new user
router.post("/signup", registerUser);

// login user
router.post("/signin", authUser);

// get current logged in user
router.get("/logged-in-user", requireUser, getCurrentUser);

// get user profile
router.get("/user-profile", requireUser, getUserProfile);

// logout user (remove cookies)
router.post("/logout", requireUser, logoutUser);

// Get forgot password otp
router.post("/send-otp", sendOtp);

// Verify otp and change password
router.post("/change-password", changePassword);

//upload user resume
router.post("/user/resume/add", singleUpload.single("file"), uploadUserResume);

export default router;
