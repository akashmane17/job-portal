import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useMyContext } from "../app/Context";
import api from "../api/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const { role, currentUser } = useMyContext();
  const [loading, setLoading] = useState(false);

  // Handle Job apply
  const handleApply = async () => {
    try {
      setLoading(true);

      const values = {
        job: job._id,
        admin: job.admin._id,
        user: currentUser.userid,
      };
      await api.post("/jobs/apply", values);
      toast.success("Applied");
    } catch (error) {
      if (error.response.data.message === "Already applied") {
        toast.error("Already applied");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 flex justify-between items-center border border-primary p-4 rounded-md">
      <div className="flex gap-4 items-center">
        <Avatar companyName={job?.companyName} />

        <div className="flex flex-col">
          <div className="flex gap-2 text-2xl">
            <p className="text-primary font-medium">Title: </p>
            <p className="text-gray-500 font-medium">{job?.title}</p>
          </div>

          <div className="flex gap-2">
            <p className="text-primary font-medium">Job Category: </p>
            <p className="text-gray-500 font-medium">{job?.jobCategory}</p>
          </div>

          <div className="flex gap-2">
            <p className="text-primary font-medium">Job Type: </p>
            <p className="text-gray-500 font-medium">{job?.jobType}</p>
          </div>

          <div className="flex gap-2">
            <p className="text-primary font-medium">Comapny: </p>
            <p className="text-gray-500 font-medium">{job?.companyName}</p>
          </div>

          <div className="flex gap-2 ">
            <p className="text-primary font-medium">Tags: </p>
            <p className="text-gray-500 font-medium">{job?.tags}</p>
          </div>

          <div className="flex gap-2 ">
            <p className="text-primary font-medium">Salary: </p>
            <p className="text-gray-500 font-medium">{job?.salary}</p>
          </div>

          <div className="flex gap-2 ">
            <p className="text-primary font-medium">Skills: </p>
            <p className="text-gray-500 font-medium">{job?.skills}</p>
          </div>

          <div className="border-2 my-2"></div>

          {job.customFields.map((field, i) => (
            <div className="flex gap-2 " key={i}>
              <p className="text-primary font-medium">{field.label}: </p>
              <p className="text-gray-500 font-medium">{field.value}</p>
            </div>
          ))}
        </div>
      </div>

      {role === "User" && (
        <div className="self-end">
          <button
            disabled={loading}
            onClick={handleApply}
            className="btn-light"
          >
            Apply
          </button>
        </div>
      )}

      {role === "Admin" && (
        <div className="self-end">
          <Link to={`/admin/jobs/edit/${job?._id}`} className="btn-light">
            Edit
          </Link>
        </div>
      )}
    </div>
  );
};

export default JobCard;
