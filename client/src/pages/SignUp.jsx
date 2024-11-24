import { useState } from "react";
import AdminSignUpForm from "../components/AdminSignUpForm";
import UserSignUpForm from "../components/UserSignUpForm";

const SignUp = () => {
  const [selectedForm, setSelectedForm] = useState("user");

  return (
    <>
      <div className="relative flex transition-all duration-300 justify-center mt-[50px]">
        <div className="flex flex-col justify-center">
          <div className="w-full justify-center flex gap-2">
            <button
              className={`px-6 py-2 font-bold rounded text-primary ${
                selectedForm === "user"
                  ? "border-b-2 border-primary"
                  : "border border-transparent "
              }`}
              onClick={() => setSelectedForm("user")}
            >
              User
            </button>
            <button
              className={`px-6 py-2 font-bold rounded text-primary ${
                selectedForm === "admin"
                  ? "border-b-2 border-primary"
                  : "border border-transparent "
              }`}
              onClick={() => setSelectedForm("admin")}
            >
              Admin
            </button>
          </div>

          {selectedForm === "user" && <UserSignUpForm />}
          {selectedForm === "admin" && <AdminSignUpForm />}
        </div>
      </div>
    </>
  );
};

export default SignUp;
