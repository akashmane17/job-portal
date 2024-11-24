import { Form, Formik } from "formik";
import React, { useState } from "react";
import Input from "./forms/Input";
import { sendOtpSchema } from "../schemas/authSchema";
import api from "../api/api";
import toast from "react-hot-toast";

const SendOtp = ({ setEmail, setIsOtpSent }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
  };

  // Verify email and send otp to email
  const handleSubmit = async (values, action) => {
    try {
      setEmail(values.email);
      setLoading(true);
      await api.post("/auth/send-otp", values);

      action.resetForm();
      toast.success("OTP sent to your email");
      setIsOtpSent(true);
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
              Forgot Password
            </h3>
            <p>An OTP will be sent to your valid email.</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={sendOtpSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <Input
                    required
                    label="Email"
                    name="email"
                    placeholder="email@example.com"
                    type="text"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark"
                  >
                    Send Otp
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

export default SendOtp;
