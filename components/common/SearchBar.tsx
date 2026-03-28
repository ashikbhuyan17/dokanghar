"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function SearchBar() {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search_query") ?? "");
  const router = useRouter();

  const handleSearch = () => {
    if (value?.trim().length >= 1) {
      router.push(`/results?search_query=${encodeURIComponent(value.trim())}`);
    }
  };
  return (
    <div className="relative flex-1">
      <Input
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        value={value}
        type="text"
        placeholder="Search products…"
        className="h-10 w-full rounded-full border-0 bg-white py-2 pl-4 pr-11 text-sm text-foreground shadow-sm ring-1 ring-border placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-muted"
      />
      <button
        type="button"
        onClick={handleSearch}
        aria-label="Search"
        className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-primary transition-colors hover:bg-primary/10 hover:text-[#e67200]"
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
}

export default SearchBar;
