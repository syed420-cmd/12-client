import { useEffect, useState } from "react";
import { TBarItem } from "@/types";
import sidebarItemsGenerator from "@/helpers/sidebarItemsGenerator";
import { userRole } from "@/constants";
import adminPaths from "@/routes/admin.routes";
import tutorPaths from "@/routes/tutor.routes";
import studentPaths from "@/routes/student.routes";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { IoClose, IoMenu } from "react-icons/io5";

const user = {
  role: userRole?.STUDENT, // Set the user role statically
};

let sidebarItems: TBarItem[];

switch (user!.role) {
  case userRole?.ADMIN:
    sidebarItems = sidebarItemsGenerator(adminPaths, userRole?.ADMIN);
    break;
  case userRole?.TUTOR:
    sidebarItems = sidebarItemsGenerator(tutorPaths, userRole?.TUTOR);
    break;
  case userRole?.STUDENT:
    sidebarItems = sidebarItemsGenerator(studentPaths, userRole?.STUDENT);
    break;

  default:
    break;
}

const DashboardLayout = () => {
  const [menuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // if (isAdminLoading || isInstructorLoading)
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       loading...
  //     </div>
  //   );

  // stop scrolling when nav is open on small devices
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <main className="min-h-screen max-h-screen flex justify-between">
      <section className="max-lg:hidden lg:w-[15%] p-5 bg-black/90 text-white">
        <Link
          to="/"
          className="inline-block w-full font-bold text-xl text-center"
        >
          Edu Fusion
        </Link>

        <hr className="w-[90%] mx-auto my-5" />

        <div className="flex flex-col items-start space-y-1.5 w-full">
          {sidebarItems?.map((item) => (
            <Link
              key={item?.label}
              to={item?.path as string}
              className={cn(
                "w-full py-2 px-3 rounded-md duration-150 ease-in-out bg-transparent whitespace-nowrap",

                location?.pathname === item?.path
                  ? "bg-blue-600 hover:bg-blue-600/95"
                  : "hover:bg-black/85"
              )}
            >
              {item?.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="overflow-y-scroll w-full lg:w-[85%] py-10 px-5 lg:px-10">
        {/* mobile side bar open button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="sticky top-0 bg-black z-10 lg:hidden mb-10"
        >
          <IoMenu className="size-6" />
        </button>

        <Outlet />
      </section>

      {/* mobile navigation overlay */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={cn(
          "bg-white/25 dark:bg-black/30 fixed top-0 right-0 w-full h-full backdrop-blur-md z-50 cursor-pointer lg:hidden",
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      ></div>

      {/* mobile navigation content */}
      <div
        className={cn(
          "bg-white/90 dark:bg-black/95 absolute top-0 left-0 w-1/2 md:w-3/12 min-h-dvh max-h-dvh z-50 lg:hidden px-3 py-10 rounded transition-transform ease-in-out duration-300",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* closing button */}
        <div className="w-[90%] mx-auto flex items-center justify-between gap-5">
          <Link to="/" className="font-bold text-xl">
            Frozify
          </Link>

          <button onClick={() => setIsMenuOpen(false)}>
            <IoClose className="size-6" />
          </button>
        </div>

        <hr className="w-[90%] mx-auto my-5" />

        {/* navigation items */}
        <div className="flex flex-col gap-1">
          {sidebarItems?.map((item) => (
            <Link
              key={item?.label}
              to={item?.path as string}
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-2 rounded hover:bg-light-gray dark:hover:bg-jet-gray duration-300 transition-all cursor-pointer"
            >
              {item?.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
