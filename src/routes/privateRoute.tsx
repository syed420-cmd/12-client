import { useAuth } from "@/providers/authProvider";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const privateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/signin" replace></Navigate>;
};

export default privateRoute;
