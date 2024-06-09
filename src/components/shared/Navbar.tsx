import { Button, buttonVariants } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/providers/themeProvider";
import { Link, useLocation } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import mainPaths from "@/routes/main.routes";
import navbarItemsGenerator from "@/helpers/navbarItemsGenerator";
import { useAuth } from "@/providers/authProvider";

const Navbar = () => {
  const navItems = navbarItemsGenerator(mainPaths);
  const { user, Logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setIsMenuOpen] = useState(false);
  const { setTheme } = useTheme();

  // stop scrolling when nav is open on small devices
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <nav className="shadow-md dark:border-b dark:border-black">
      <div className="section-wrapper flex items-center justify-between py-3">
        {/* left side */}
        <Link to="/" className="font-bold text-xl">
          Edu Fusion
        </Link>

        {/* middle */}
        <div className="max-md:hidden flex justify-between gap-5">
          {navItems?.map((item) => (
            <Link
              key={item?.label}
              to={item?.path as string}
              className={cn(
                location?.pathname === item?.path && "text-blue-500 font-medium"
              )}
            >
              {item?.label}
            </Link>
          ))}
        </div>

        {/* right side */}
        <div className="flex items-center gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-md" variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <Button onClick={Logout}>Logout</Button>
          ) : (
            <Link to="/signin" className={buttonVariants()}>
              Signin
            </Link>
          )}

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
            <IoMenu className="size-6" />
          </button>
        </div>

        {/* mobile navigation overlay */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={cn(
            "bg-white/25 dark:bg-black/30 fixed top-0 right-0 w-full h-full backdrop-blur-md z-50 cursor-pointer md:hidden",
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
        ></div>

        {/* mobile navigation content */}
        <div
          className={cn(
            "bg-white/90 dark:bg-black/95 absolute top-0 left-0 w-1/2 min-h-dvh max-h-dvh z-50 md:hidden px-3 py-10 rounded transition-transform ease-in-out duration-300",
            menuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* closing button */}
          <div
            onClick={() => setIsMenuOpen(false)}
            className="flex justify-end mb-5"
          >
            <button>
              <IoClose className="size-6" />
            </button>
          </div>

          {/* navigation items */}
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item?.label}
                to={item?.path as string}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-4 py-2 rounded duration-300 transition-all cursor-pointer hover:bg-slate-200/90 dark:hover:bg-black/85",

                  location?.pathname === item?.path &&
                    "bg-slate-200/90 dark:bg-black/85 font-medium"
                )}
              >
                {item?.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
