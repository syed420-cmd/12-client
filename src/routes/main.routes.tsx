import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import Home from "@/pages/Home";
import StudySession from "@/pages/StudySession";
import Tutors from "@/pages/Tutors";

const mainPaths = [
  {
    label: "Home",
    path: "/",
    element: <Home />,
  },
  {
    label: "Study Sessions",
    path: "/study-sessions",
    element: <StudySession />,
  },
  {
    label: "Tutors",
    path: "/tutors",
    element: <Tutors />,
  },
  {
    label: "About Us",
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    label: "Contact Us",
    path: "/contact-us",
    element: <ContactUs />,
  },
];

export default mainPaths;
