import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import api from "../api/api";
import EditJobForm from "../components/EditJobForm";

const EditJob = () => {
  const [job, setJob] = useState();
  const [loading, setLoading] = useState(false);
  const { id: jobId } = useParams();

  // Get job data and pass into EditJobForm
  async function getJobById() {
    try {
      setLoading(true);
      const response = await api.get(`/jobs/${jobId}`);
      setJob(response.data[0]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getJobById();
  }, []);

  return (
    <Layout>
      {loading ? <div>Loading...</div> : <EditJobForm jobData={job} />}
    </Layout>
  );
};

export default EditJob;
