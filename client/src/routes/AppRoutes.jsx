import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import PageNotFound from "../pages/PageNotFound";
import ReverseAuthRoute from "./ReverseAuth";
import ProtectedRoute from "./ProtectedRoute";
import AddJob from "../pages/AddJob";
import AppliedJobs from "../pages/AppliedJobs";
import Applications from "../pages/Applications";
import EditJob from "../pages/EditJob";
import UserProfile from "../pages/UserProfile";
import ForgotPassword from "../pages/ForgotPassword";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <ReverseAuthRoute>
            <SignUp />
          </ReverseAuthRoute>
        }
      />

      <Route
        path="/signin"
        element={
          <ReverseAuthRoute>
            <SignIn />
          </ReverseAuthRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <ReverseAuthRoute>
            <ForgotPassword />
          </ReverseAuthRoute>
        }
      />

      <Route
        index
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users/applied"
        element={
          <ProtectedRoute>
            <AppliedJobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/application"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/jobs/add"
        element={
          <ProtectedRoute adminPage={true}>
            <AddJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/jobs/edit/:id"
        element={
          <ProtectedRoute adminPage={true}>
            <EditJob />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
