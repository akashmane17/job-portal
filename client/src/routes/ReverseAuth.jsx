import { Navigate } from "react-router-dom";
import { useMyContext } from "../app/Context";

const ReverseAuthRoute = ({ children }) => {
  const { currentUser } = useMyContext();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ReverseAuthRoute;
