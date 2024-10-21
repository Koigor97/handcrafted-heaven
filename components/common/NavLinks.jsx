'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const NavLinks = () => {
  const pathName = usePathname();

  return (
    <div>
      <nav className="flex space-x-0 md:space-x-2">
        <div>
          <Link
            href="/"
            className={`
              relative md:text-lg
              md:px-4 md:py-2 md:text-gray-800 md:no-underline
              md:transition-all md:duration-200 md:ease-in-out
              md:transform md:hover:mr-2 md:hover:ml-2 md:hover:bg-accent2-500 md:hover:text-text-50 md:hover:scale-105
              ${pathName === '/' ? 'font-bold' : 'text-gray-800'}
              px-2 py-1 text-sm
              hover:mr-0 hover:ml-0 hover:scale-100 hover:bg-accent2-500 hover:text-text-50
              transition-none
              rounded-md
            `}
          >
            Home
          </Link>
        </div>
        <div>
          <Link
            href="/products"
            className={`
              relative md:text-lg
              md:px-4 md:py-2 md:text-gray-800 md:no-underline
              md:transition-all md:duration-200 md:ease-in-out
              md:transform md:hover:mr-2 md:hover:ml-2 md:hover:bg-accent2-500 md:hover:text-text-50 md:hover:scale-105
              ${pathName === '/products' ? 'font-bold' : 'text-gray-800'}
              px-2 py-1 text-sm
              hover:mr-0 hover:ml-0 hover:scale-100 hover:bg-accent2-500 hover:text-text-50
              transition-none
              rounded-md
            `}
          >
            Shop Now
          </Link>
        </div>
        <div>
          <Link
            href="/about"
            className={`
              relative md:text-lg
              md:px-4 md:py-2 md:text-gray-800 md:no-underline
              md:transition-all md:duration-200 md:ease-in-out
              md:transform md:hover:mr-2 md:hover:ml-2 md:hover:bg-accent2-500 md:hover:text-text-50 md:hover:scale-105
              ${pathName === '/about' ? 'font-bold' : 'text-gray-800'}
              px-2 py-1 text-sm
              hover:mr-0 hover:ml-0 hover:scale-100 hover:bg-accent2-500 hover:text-text-50
              transition-none
              rounded-md
            `}
          >
            About
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavLinks;
