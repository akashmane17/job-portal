import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/api";
import { useMyContext } from "../../app/Context";

const FileUpload = () => {
  const { currentUser } = useMyContext();
  const [file, setFile] = useState(null);

  const validateFile = (file) => {
    // Validate file type
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed!");
      return false;
    }

    // Validate file size (1MB = 1024 * 1024 bytes)
    if (file.size > 1024 * 1024) {
      toast.error("File size should be less than 1MB!");
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile && validateFile(uploadedFile)) {
      setFile(uploadedFile);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a valid file before submitting!");
      return;
    }

    const userid = currentUser.userid;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userid", userid);

    try {
      const response = await api.post("/auth/user/resume/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("File uploaded successfully!");
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload resume.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Upload Resume
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="fileInput"
              className="block text-sm font-medium text-gray-600"
            >
              Select a file (PDF, max 1MB)
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-600 border border-gray-300 rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
        {file && (
          <div className="mt-4 p-4 border border-green-300 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 font-medium">
              Selected File: {file.name}
            </p>
            <p className="text-xs text-green-600">
              Size: {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
