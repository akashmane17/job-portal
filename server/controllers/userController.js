import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sendEmail from "../utils/email.js";

// ASW S3 config
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// POST: register user
export const registerUser = asyncHandler(async (req, res) => {
  const { type, ...body } = req.body;

  const userExists = await User.findOne({ email: body.email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const commonFields = {
    role: type,
    name: body.name,
    email: body.email,
    phoneNumber: body.phoneNumber,
    password: body.password,
  };

  const userSpecificFields =
    type === "User"
      ? {
          skills: body.skills,
          experience: body.experience,
        }
      : {};

  if (type !== "Admin" && !Object.keys(userSpecificFields).length) {
    res.status(400).json({ message: "Invalid user type" });
    return;
  }

  const userdata = { ...commonFields, ...userSpecificFields };

  const user = await User.create(userdata);

  if (user) {
    res.status(201).json({ message: "User created successfully" });
  } else {
    res.status(400).json({ message: "Failed to create user" });
  }
});

// POST: Login User
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isPasswordMatched = await user.matchPassword(password);

  if (!isPasswordMatched) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const payload = {
    userid: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const token = generateToken(payload, "10d");

  res.cookie("auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(payload);
});

// POST: Send otp by email
export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  user.otp = {
    key: otp,
    exp: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
  };

  await user.save();

  // send email to user
  sendEmail(
    user.email,
    "OTP for password change",
    `Dear user your OTP is ${otp}, will expire in 10 mins`
  );

  res.status(200).json({ message: "Otp sent" });
});

// POST: Send otp by email
export const changePassword = asyncHandler(async (req, res) => {
  const { otp, email, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if OTP exists and is valid
  if (user.otp && user.otp.key === otp) {
    const currentTime = new Date();
    const otpExpirationTime = new Date(user.otp.exp);

    if (otpExpirationTime < currentTime) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.password = newPassword;
    user.otp = undefined;

    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
});

// POST: Logout User (remove cookies)
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("auth", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// GET: Logged In user
export const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "unathorized" });

  const user = req.user;

  if (user) {
    res.status(200).json(user);
  }
});

// GET: logged In user profile
export const getUserProfile = asyncHandler(async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "unathorized" });

  const user = await User.find(
    { _id: req.user.session.userid },
    { __v: 0, password: 0 }
  );

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json("User not found");
  }
});

// POST: Upload user resume to aws and save link to db
export const uploadUserResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const pdfLink = await uploadToS3(req.file);

  const userId = req.body.userid;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { pdfLink } },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({
    message: "Resume uploaded successfully",
    pdfLink: pdfLink,
    user: updatedUser,
  });
});

// HELPER: Upload to AWS S3 Bucket
const uploadToS3 = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(params));

    return `https://${BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;
  } catch (err) {
    console.error("Error uploading to S3:", err);
    throw err;
  }
};
