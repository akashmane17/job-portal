import { useState } from "react";
import api from "../api/api";
import Input from "../components/forms/Input";
import { signinSchema } from "../schemas/authSchema";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../app/Context";

const SignIn = () => {
  const { setCurrentUser } = useMyContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  // Login handler for both admin and user
  const handleSubmit = async (values, action) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/signin", values);

      if (response.data) {
        setCurrentUser(response.data);
        action.resetForm();
        toast.success("login Successful");
        // navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setError("Something went wrong!");
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex transition-all duration-300 justify-center mt-[50px]">
      <div className="flex flex-col justify-center">
        <div className="w-full max-w-screen-sm lg:min-w-[600px] border border-primary p-6 rounded-md bg-white shadow-md">
          <div className="mb-4">
            <h3 className=" text-primary text-2xl font-medium">Sign In</h3>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={signinSchema}
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
                    Sign In
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-4">
            <Link
              className="text-primary underline font-bold"
              to="/forgot-password"
            >
              Forgot Password
            </Link>{" "}
          </div>
          <div className="mt-2">
            <p>
              New here{" "}
              <Link className="text-primary underline font-bold" to="/signup">
                Create an account.
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
