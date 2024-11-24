import React, { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import Layout from "../components/Layout";

const AppliedJobs = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState();

  useEffect(() => {
    getAllJobs();
  }, []);

  // Get all the jobs applied by user
  const getAllJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/jobs/applied-jobs");

      setJobList(response?.data);
    } catch (error) {
      toast.error("Failed to fetch the applications");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div>
        <table className="min-w-full border-collapse border border-gray-200 text-left">
          <thead className="bg-light ">
            <tr className="">
              <th className="border text-primary border-gray-300 px-4 py-2">
                Title
              </th>
              <th className="border text-primary border-gray-300 px-4 py-2">
                Company Name
              </th>
              <th className="border text-primary border-gray-300 px-4 py-2">
                Status
              </th>
              <th className="border text-primary border-gray-300 px-4 py-2">
                Reason
              </th>
            </tr>
          </thead>

          <tbody>
            {jobList?.map((appl) => (
              <tr key={appl._id} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {appl?.job?.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appl?.job?.companyName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appl?.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appl?.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AppliedJobs;
