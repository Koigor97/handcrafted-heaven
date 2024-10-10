import Link from 'next/link';
import React from 'react';

const NavLinks = () => {
  return (
    <nav className="flex space-x-4">
      
      <Link 
    href="/" 
    className="relative px-4 py-2 text-gray-800 no-underline transition-all duration-200 ease-in-out transform hover:mr-2 hover:ml-2 hover:bg-accent2-500 hover:text-text-50 hover:scale-105"
  >
    Home
  </Link>
  <Link 
    href="/products" 
    className="relative px-4 py-2 text-gray-800 no-underline transition-all duration-200 ease-in-out transform hover:mr-2 hover:ml-2 hover:bg-accent2-500 hover:text-text-50 hover:scale-105"
  >
    Shop Now
  </Link>
  <Link 
    href="/about" 
    className="relative px-4 py-2 text-gray-800 no-underline transition-all duration-200 ease-in-out transform hover:mr-2 hover:ml-2 hover:bg-accent2-500 hover:text-text-50 hover:scale-105"
  >
    About
  </Link>
    </nav>
  );
};

export default NavLinks;