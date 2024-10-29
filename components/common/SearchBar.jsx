"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 400);

  return (
    <div className="flex w-full items-center space-x-2 md:max-w-sm">
      <Input
        type="text"
        placeholder="Search products..."
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Button
        type="submit"
        className="flex items-center md:hover:bg-secondary1-800 md:hover:text-text-50 py-2 px-3"
      >
        <Search className="w-5 h-5 md:hidden" />
        <span className="hidden md:flex">Search</span>
      </Button>
    </div>
  );
}
