import { Form, Formik } from "formik";
import React, { useState } from "react";
import Input from "./forms/Input";
import { useMyContext } from "../app/Context";
import toast from "react-hot-toast";
import { jobsPostSchema } from "../schemas/jobsSchema";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const EditJobForm = ({ jobData }) => {
  const { currentUser } = useMyContext();
  const [loading, setLoading] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [label, setLabel] = useState(false);
  const [value, setValue] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    _id: jobData?._id || "",
    admin: currentUser?.userid || "",
    title: jobData?.title || "",
    companyName: jobData?.companyName || "",
    tags: jobData?.tags || "",
    skills: jobData?.skills || "",
    jobCategory: jobData?.jobCategory || "",
    jobType: jobData?.jobType || "",
    description: jobData?.description || "",
    salary: jobData?.salary || "",
    experience: jobData?.experience || "",
    customFields: jobData?.customFields || [],
  };

  // to view custom fields form
  function toggleCustomField() {
    setIsCustom(true);
  }

  // Add custom field on to current Form state
  const handleAddCustomField = (setFieldValue, values) => {
    let field = {
      label: label.toLowerCase(),
      value: value,
    };

    const updatedFields = [...values.customFields, field];
    setFieldValue("customFields", updatedFields); // Update the customFields field in Formik

    setLabel("");
    setValue("");
    setIsCustom(false);
  };

  // Hanlde changed values for custom fields
  function handleCustomFieldChange(index, e, setFieldValue, values) {
    let fieldArray = values.customFields;
    fieldArray[index].value = e.target.value;
    setFieldValue("customFields", fieldArray);
  }

  // Submit the form
  const handleSubmit = async (values, action) => {
    try {
      setLoading(true);
      const response = await api.put("/jobs/edit", values);
      toast.success("Job updated Successfully");
      action.resetForm();
      if (response.data) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-center">
        <div className="w-full max-w-screen-sm lg:min-w-[600px] border border-primary p-6 rounded-md bg-white shadow-md">
          <div className="mb-4">
            <h3 className="text-primary text-2xl font-medium">Edit Job Post</h3>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={jobsPostSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, errors, values }) => (
              <Form className="space-y-4">
                <p>{JSON.stringify(errors)}</p>
                <div>
                  <Input
                    required
                    label="Title"
                    name="title"
                    placeholder="title"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Company Name"
                    name="companyName"
                    placeholder="company name"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Job Category"
                    name="jobCategory"
                    placeholder="Eg. Development"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Job Type"
                    name="jobType"
                    placeholder="Eg. Remote"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Tags"
                    name="tags"
                    placeholder="tags"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Skills"
                    name="skills"
                    placeholder="skills"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Description"
                    name="description"
                    placeholder="description"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Experience"
                    name="experience"
                    placeholder="0 - 1 years"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Salary"
                    name="salary"
                    placeholder="0 - 10 lpa"
                    type="text"
                  />
                </div>

                {values?.customFields?.map((field, i) => (
                  <div key={i}>
                    <Input
                      required
                      label={field.label}
                      name={field.label}
                      placeholder={field.label}
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        handleCustomFieldChange(i, e, setFieldValue, values)
                      }
                    />
                  </div>
                ))}

                {!isCustom && (
                  <div className="mt-4">
                    <button
                      onClick={toggleCustomField}
                      disabled={loading}
                      className="w-full bg-light text-primary border border-primary py-2 rounded-md hover:bg-primary-dark"
                    >
                      Add custom field
                    </button>
                  </div>
                )}

                {isCustom && (
                  <div className="py-2">
                    <label className={`mb-2 block font-medium text-primary `}>
                      Create a custom field
                    </label>
                    <div className="flex gap-4">
                      <input
                        className={`w-full"border-stroke" rounded-lg border bg-transparent py-2 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none`}
                        name="reason"
                        placeholder="Add input label"
                        autoComplete="off"
                        onChange={(e) => setLabel(e.target.value)}
                      />
                      <input
                        className={`w-full"border-stroke" rounded-lg border bg-transparent py-2 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none`}
                        name="reason"
                        placeholder="Add input value"
                        autoComplete="off"
                        onChange={(e) => setValue(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleAddCustomField(setFieldValue, values)
                        }
                        className="w-full bg-light text-primary border border-primary py-2 rounded-md hover:bg-primary-dark"
                      >
                        Add Field
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark"
                  >
                    Update Job Post
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditJobForm;
