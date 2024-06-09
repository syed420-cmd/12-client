import ViewUsers from "@/pages/dashboard/admin/ViewUsers";
import ViewSessions from "@/pages/dashboard/admin/ViewSessions";
import ViewMaterials from "@/pages/dashboard/admin/ViewMaterials";

const adminPaths = [
  {
    label: "View Users",
    path: "view-users",
    element: <ViewUsers />,
  },
  {
    label: "View Sessions",
    path: "view-sessions",
    element: <ViewSessions />,
  },
  {
    label: "View Materials",
    path: "view-materials",
    element: <ViewMaterials />,
  },
];

export default adminPaths;
