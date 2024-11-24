import { Form, Formik } from "formik";
import Input from "./forms/Input";
import { userSignUpSchema } from "../schemas/authSchema";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

const UserSignUpForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    type: "User",
    name: "",
    skills: "",
    experience: "",
    email: "",
    phoneNumber: "",
    password: "",
  };

  // Sign up for the user
  const handleSubmit = async (values, action) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/signup", values);

      toast.success("Reagister Successful");
      action.resetForm();
      if (response.data) {
        navigate("/signin");
      }
    } catch (error) {
      if (error.response.message === "User already exists") {
        toast.error("User already exists");
      } else if (error.response.data.message.includes("E11000")) {
        toast.error("User with same phone number already exists");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-center">
        <div className="w-full max-w-screen-sm lg:min-w-[600px] border border-primary p-6 rounded-md bg-white shadow-md">
          <div className="mb-4">
            <h3 className="text-primary text-2xl font-medium">Sign Up</h3>
            <p className=" text-primary text-md">{`(For Users)`}</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={userSignUpSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <Input
                    required
                    label="Name"
                    name="name"
                    placeholder="Your name"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Skills"
                    name="skills"
                    placeholder="html, css, js,..."
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Experience"
                    name="experience"
                    placeholder="0 yr 0 m"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Phone No."
                    name="phoneNumber"
                    placeholder="00000 00000"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Email"
                    name="email"
                    placeholder="email@example.com"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Password"
                    name="password"
                    placeholder="*******"
                    type="password"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark"
                  >
                    Sign Up as a User
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-4">
            <p>
              Already have an account? go to{" "}
              <Link className="text-primary font-bold underline" to="/signin">
                Sign In
              </Link>{" "}
              here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUpForm;
