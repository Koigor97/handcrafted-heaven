"use client";

import { useState, useEffect } from "react";
import Logo from "../common/Logo";
import NavLinks from "../common/NavLinks";
import { Button } from "../ui/button";
import Banner from "./Banner";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null); // Track which button is active
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); // Track Sign Up dropdown state
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Track Login dropdown state

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignUpClick = () => {
    setActiveButton("signup");
    setIsSignUpOpen((prev) => !prev); // Toggle Sign Up dropdown
    setIsLoginOpen(false); // Close Login dropdown if it's open
  };

  const handleLoginClick = () => {
    setActiveButton("login");
    setIsLoginOpen((prev) => !prev); // Toggle Login dropdown
    setIsSignUpOpen(false); // Close Sign Up dropdown if it's open
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        // Change 640 to your breakpoint for mobile
        // Close dropdowns if the screen is wide enough
        setIsSignUpOpen(false);
        setIsLoginOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Banner />

      <div className=" bg-primary ">
        <div className="flex justify-between items-center py-4 px-4 max-w-custom-clamp2 mx-auto">
          <div className="flex items-center gap-4 px-0">
            <Logo className="w-10 h-auto md:w-16" />
            <span className="text-sm md:text-lg font-bold text-gray-700 whitespace-nowrap">
              Handcrafted Haven
            </span>
          </div>

          <div className="sm:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              {isOpen ? (
                <XIcon className="h-6 w-6 text-gray-700" />
              ) : (
                <MenuIcon className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          <div className="hidden sm:flex space-x-1">
            <NavLinks />
          </div>

          <div className="hidden sm:flex space-x-2 justify-end">
            <DropdownMenu open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={activeButton === "signup" ? "outline" : "default"}
                  onClick={handleSignUpClick}
                  className="px-4 py-2 text-xs sm:text-sm md:text-base border border-accent2-500 whitespace-nowrap"
                >
                  Sign Up
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-45">
                <DropdownMenuLabel>Choose account sign up</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/auth/signup">User Sign up</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/onboarding">Artisan Sign up</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={activeButton === "login" ? "outline" : "default"}
                  onClick={handleLoginClick}
                  className="px-4 py-2 text-xs sm:text-sm md:text-base border border-accent2-500 whitespace-nowrap"
                >
                  Login
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-45">
                <DropdownMenuLabel>Choose account Login</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">User Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">Artisan Login</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-50 bg-white transition-transform transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } sm:hidden`}
        >
          <div className="flex flex-col p-4">
            <button onClick={toggleMenu} className="self-end">
              <XIcon className="h-10 w-10 text-gray-800" />
            </button>

            <div className="flex flex-col items-center space-y-4 mt-4">
              <NavLinks className="text-sm sm:text-base md:text-lg" />
            </div>

            <div className="flex justify-center space-x-2 mb-4 mt-7">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="px-4 py-2 text-sm sm:text-base"
                  >
                    Sign Up
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-45">
                  <DropdownMenuLabel>Choose account sign up</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign up as user</DropdownMenuItem>
                  <DropdownMenuItem>Sign up as Artisan</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="px-4 py-2 text-sm sm:text-base"
                  >
                    Login
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-45">
                  <DropdownMenuLabel>Choose account Login</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>User Login</DropdownMenuItem>
                  <DropdownMenuItem>Artisan Login</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
