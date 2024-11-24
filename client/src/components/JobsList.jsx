import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import api from "../api/api";
import toast from "react-hot-toast";

const JobsList = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState();

  // Fetch jobs
  useEffect(() => {
    getAllJobs();
  }, []);

  // Get all jobs handler
  const getAllJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/jobs/all");

      setJobList(response?.data);
    } catch (error) {
      toast.error("Failed to fetchF the jobs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {jobList?.map((job) => (
        <div key={job._id}>
          <JobCard job={job} />
        </div>
      ))}
    </div>
  );
};

export default JobsList;
