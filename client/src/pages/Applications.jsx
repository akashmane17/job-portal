import React, { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import Avatar from "../components/Avatar";
import { Link } from "react-router-dom";

const Applications = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState();
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(-1);
  const [reason, setReason] = useState("");

  useEffect(() => {
    getAllJobs();
  }, []);

  // Toggle Reject Form
  const toggleReject = (id) => {
    setEdit(true);
    setId(id);
  };

  // Get all jobs initially
  const getAllJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/jobs/applications");
      setJobList(response?.data);
    } catch (error) {
      toast.error("Failed to fetch the applications");
    } finally {
      setLoading(false);
    }
  };

  // Handles both accept and reject based on status parameter
  const handleAccept = async (appl, status) => {
    try {
      if (status === "reject" && !reason) {
        toast.error("please add reason");
        return;
      }

      let value = {
        _id: appl._id,
        status: status === "accept" ? "Accepted" : "Rejected",
        reason: status === "reject" ? reason : null,
      };

      const response = await api.post("/jobs/respond", value);
      toast.success("response updated successfully");
      setEdit(false);
      setReason("");
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <Layout>
      <div>
        {jobList?.map((appl, i) => (
          <div
            key={i}
            className="mb-6 flex justify-between items-center border border-primary p-4 rounded-md"
          >
            <div className="flex gap-4 items-center">
              <Avatar companyName={appl?.job?.companyName} />

              <div className="flex flex-col">
                <div className="flex gap-2 text-2xl">
                  <p className="text-primary font-medium">Title: </p>
                  <p className="text-gray-500 font-medium">
                    {appl?.job?.title}
                  </p>
                </div>
                <div className="flex gap-2 ">
                  <p className="text-primary font-medium">Comapny: </p>
                  <p className="text-gray-500 font-medium">
                    {appl?.job?.companyName}
                  </p>
                </div>
                <div className="border-2 my-2" />
                <div className="flex gap-2 ">
                  <p className="text-primary font-medium">Relevancy: </p>
                  <p className="text-gray-500 font-medium">{appl?.relevancy}</p>
                </div>
                <div className="flex gap-2 ">
                  <p className="text-primary font-medium">Name: </p>
                  <p className="text-gray-500 font-medium">
                    {appl?.user?.name}
                  </p>
                </div>
                <div className="flex gap-2 ">
                  <p className="text-primary font-medium">Skills: </p>
                  <p className="text-gray-500 font-medium">
                    {appl?.user?.skills}
                  </p>
                </div>
                <div className="flex gap-2 ">
                  <p className="text-primary font-medium">Experience: </p>
                  <p className="text-gray-500 font-medium">
                    {appl?.user?.experience} year
                  </p>
                </div>
                <div className="flex gap-2 ">
                  <p className="text-primary font-medium">Status: </p>
                  <p className="text-gray-500 font-medium">{appl?.status}</p>
                </div>

                {/* View users Resume PDF in new tab */}
                <div className="flex gap-2 ">
                  <Link
                    to={appl?.user?.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline hover:underline-offset-2"
                  >
                    View Resume
                  </Link>
                </div>

                {/* View reason if there is any */}
                {appl?.reason && (
                  <div className="flex gap-2 ">
                    <p className="text-primary font-medium">Reason: </p>
                    <p className="text-gray-500 font-medium">{appl?.reason}</p>
                  </div>
                )}
              </div>
            </div>

            {appl?.status === "Pending" && id !== i && (
              <div className="self-end gap-2 flex">
                <button
                  className="btn-light"
                  onClick={() => handleAccept(appl, "accept")}
                >
                  Accept
                </button>
                <button onClick={() => toggleReject(i)} className="btn-light">
                  Reject
                </button>
              </div>
            )}

            {edit && i === id && (
              <div className="self-end">
                <div className="relative mb-1 flex gap-2">
                  <input
                    className={`w-full"border-stroke" rounded-lg border bg-transparent py-2 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none`}
                    name="reason"
                    placeholder="add your reason here"
                    autoComplete="off"
                    onChange={(e) => setReason(e.target.value)}
                  />
                  <button
                    onClick={() => handleAccept(appl, "reject")}
                    className="btn-light"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Applications;
