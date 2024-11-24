import { Form, Formik } from "formik";
import React, { useState } from "react";
import Input from "./forms/Input";
import { verifyOtpSchema } from "../schemas/authSchema";
import api from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({ email }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: email,
    otp: "",
    newPassword: "",
  };

  // Verify otp and change password
  const handleSubmit = async (values, action) => {
    try {
      setLoading(true);

      await api.post("/auth/change-password", values);

      action.resetForm();
      toast.success("Password Changes");
      navigate("/");
    } catch (error) {
      setError("Something went wrong!");
      toast.error("Invalid email");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex transition-all duration-300 justify-center mt-[50px]">
      <div className="flex flex-col justify-center">
        <div className="w-full max-w-screen-sm lg:min-w-[600px] border border-primary p-6 rounded-md bg-white shadow-md">
          <div className="mb-4">
            <h3 className=" text-primary text-2xl font-medium">
              Change Password
            </h3>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={verifyOtpSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <Input
                    required
                    label="OTP"
                    name="otp"
                    placeholder="otp"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="New Password"
                    name="newPassword"
                    placeholder="******"
                    type="password"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark"
                  >
                    Verify & Change Password
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

export default ChangePassword;
