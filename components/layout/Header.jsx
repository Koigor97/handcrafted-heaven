'use client';

import { useState } from "react";
import Logo from "../common/Logo"; 
import NavLinks from "../common/NavLinks"; 
import { Button } from "../ui/button"; 
import Banner from "./Banner";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

function Header() {
    //This is for the hamburger menu
    const [isOpen, setIsOpen] = useState(false); 

    const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  //Added this to activate outline for buttons.
  const [activeButton, setActiveButton] = useState(null); // Track which button is active

  const handleSignUpClick = () => {
    setActiveButton("signup"); // Set active button to Sign Up
  };

  const handleLoginClick = () => {
    setActiveButton("login"); // Set active button to Login
  };
  
  return (
    <>
      <Banner />

      <div className="flex justify-between items-center bg-primary py-0 px-4">
       
        <div className="flex items-center gap-4">
         
          <Logo className=" w-20" />
         
          <span className="text-lg font-bold text-gray-700">Handcrafted Haven</span>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <XIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <MenuIcon className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
        
        <div className={`hidden md:flex space-x-4 `}>
          <NavLinks />
        </div>


        <div className="hidden md:flex space-x-2">
          
          <Button 
            variant={activeButton === "signup" ? "outline" : "default"}
            onClick={handleSignUpClick} 
            className="px-4 border border-accent2-500"
          >
            SignUp
          </Button>
          
          <Button 
            variant={activeButton === "login" ? "outline" : "default"} 
            onClick={handleLoginClick}
            className="px-4 border border-accent2-500"
          >
            Login
          </Button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-white transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col p-4">
          {/* Close Button */}
          <button onClick={toggleMenu} className="self-end">
            <XIcon className="h-10 w-10 text-gray-800" />
          </button>

          {/* Centered Navigation Links */}
          <div className="flex flex-col items-center space-y-4 mt-4">
            <NavLinks />
          </div>

          {/* Sign Up and Login Buttons */}
          <div className="flex justify-center space-x-2 mb-4 mt-7">
            <Button variant="outline" className="px-4">
              Sign Up
            </Button>
            <Button variant="default" className="px-4">
              Login
            </Button>
          </div>
        </div>
        </div>

    </>
  );
}

export default Header;