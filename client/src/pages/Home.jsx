import React from "react";
import Layout from "../components/Layout";
import { useMyContext } from "../app/Context";
import JobsList from "../components/JobsList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { role } = useMyContext();
  const navigate = useNavigate();

  // Create job post handler for admin only
  const handleAddJob = () => {
    navigate("/admin/jobs/add");
  };

  return (
    <Layout>
      {role === "Admin" && (
        <div className="w-full mb-4">
          <button onClick={handleAddJob} className="btn-light">
            Post a new Job
          </button>
        </div>
      )}

      <div className="mt-4 max-w-screen-sm lg:min-w-[600px] mx-auto">
        <JobsList />
      </div>
    </Layout>
  );
};

export default Home;
