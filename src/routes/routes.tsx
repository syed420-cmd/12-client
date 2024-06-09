import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ErrorPage from "@/pages/ErrorPage";
import routeGenerator from "@/helpers/routesGenerator";
import mainPaths from "./main.routes";
import adminPaths from "./admin.routes";
import tutorPaths from "./tutor.routes";
import studentPaths from "./student.routes";
import Signup from "@/pages/auth/Signup";
import Signin from "@/pages/auth/Signin";

const router = createBrowserRouter([
  // main routes
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: routeGenerator(mainPaths),
  },

  // dashboard routes
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/tutor/dashboard",
    element: <DashboardLayout />,
    children: routeGenerator(tutorPaths),
  },
  {
    path: "/student/dashboard",
    element: <DashboardLayout />,
    children: routeGenerator(studentPaths),
  },

  // auth routes
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },
]);

export default router;
