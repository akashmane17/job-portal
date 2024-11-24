import * as Yup from "yup";

export const jobsPostSchema = Yup.object({
  title: Yup.string().required("Required"),
  companyName: Yup.string().required("Required"),
  tags: Yup.string().required("Required"),
  skills: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  salary: Yup.string().required("Required"),
  jobType: Yup.string().required("Required"),
  jobCategory: Yup.string().required("Required"),
  experience: Yup.number()
    .min(0, "Experience cannot be negative")
    .max(60, "Are you sure about the years?")
    .required("Years of experience is required"),
});
