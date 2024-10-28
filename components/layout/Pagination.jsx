// components/Pagination.jsx
"use client";

import React from 'react';
import cslx from 'clsx';
import { ArrowLeft, ArrowRight} from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Pagination ({totalPages})  {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageUrl = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <PaginationArrow
        href={createPageUrl(currentPage - 1)}
        direction="left"
        isDisabled={currentPage <= 1}
      />

      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      <PaginationArrow
        href={createPageUrl(currentPage + 1)}
        direction="right"
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
};

function PaginationArrow({ href, direction, isDisabled }) {
  const className = cslx(
    "flex h-10 w-10 items-center justify-center rounded-md",
    {
      "pointer-events-none bg-accent2-100 text-text-400 border-accent2-100": isDisabled,
      "hover:bg-accent2-700 hover:text-text-200 transition border-card bg-primary": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon = direction === "left" ? (
    <ArrowLeft/>
  ) : (
    <ArrowRight/>
  );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  )
}
