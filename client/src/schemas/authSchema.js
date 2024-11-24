import * as Yup from "yup";

export const userSignUpSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  skills: Yup.string("Invalid skills").required("Skills are required"),

  experience: Yup.number()
    .min(0, "Experience cannot be negative")
    .max(60, "Are you sure about the years?")
    .required("Years of experience is required"),

  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Are you sure about the password?")
    .required("Password is required"),
});

export const signinSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Are you sure about the password?")
    .required("Password is required"),
});

export const sendOtpSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const verifyOtpSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Are you sure about the password?")
    .required("Password is required"),
  otp: Yup.string().required("Required"),
});

export const adminSignUpSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Are you sure about the password?")
    .required("Password is required"),
});
