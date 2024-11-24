import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMyContext } from "../app/Context";
import toast from "react-hot-toast";
import api from "../api/api";

const Header = () => {
  const { currentUser, setCurrentUser, role } = useMyContext();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      toast.success("Logout Successful");

      navigate("/signin");
      setCurrentUser(null);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <header className="bg-light text-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary">
            <div className="w-12 h-12 text-lg font-bold bg-white text-primary flex items-center justify-center rounded-full border">
              JP
            </div>
            <span className="text-xl font-semibold tracking-wide">
              Job Portal
            </span>
          </Link>

          <h2 className="text-lg text-primary font-medium">
            Welcome {currentUser?.name}
          </h2>

          <nav className="hidden md:flex space-x-8 items-center">
            {role === "Admin" && (
              <Link
                to="/admin/application"
                className="block text-primary hover:text-dark transition-colors duration-300"
              >
                Applications
              </Link>
            )}

            {role === "User" && (
              <>
                <Link
                  to="/users/applied"
                  className="block text-primary hover:text-dark transition-colors duration-300"
                >
                  Applied Jobs
                </Link>
                <Link
                  to="/profile"
                  className="block text-primary hover:text-dark transition-colors duration-300"
                >
                  Profile
                </Link>
              </>
            )}

            <button
              className="block bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition text-center"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
