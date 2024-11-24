import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/api";
import FileUpload from "../components/forms/FileUpload";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  // Fetch user profile data
  const fetchUser = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/auth/user-profile`);

      setUser(data[0]);
    } catch (error) {
      console.error("Error fetching current user", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Layout>
      <div className="flex justify-evenly items-center">
        <div className="max-w-sm rounded-lg shadow-lg mt-6 bg-white p-6">
          <div className="flex items-center justify-center">
            <div className="h-24 w-24 bg-primary text-white flex justify-center items-center rounded-full text-2xl font-bold">
              {user?.name.charAt(0)}
            </div>
          </div>
          <h2 className="text-center text-xl font-semibold mt-4 text-gray-800">
            {user?.name}
          </h2>
          <p className="text-center text-gray-600">{user?.role}</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <span className="material-icons text-primary font-medium mr-2">
                email
              </span>
              <p className="text-gray-700">{user?.email}</p>
            </div>
            <div className="flex items-center">
              <span className="material-icons text-primary font-medium mr-2">
                phone
              </span>
              <p className="text-gray-700">{user?.phoneNumber}</p>
            </div>
            <div className="flex items-center">
              <span className="material-icons text-primary font-medium mr-2">
                work
              </span>
              <p className="text-gray-700">
                Experience: {user?.experience} year(s)
              </p>
            </div>
            <div className="flex items-center">
              <span className="material-icons text-primary font-medium mr-2">
                Skills
              </span>
              <p className="text-gray-700">{user?.skills}</p>
            </div>
          </div>
        </div>

        <div>
          <FileUpload />
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
