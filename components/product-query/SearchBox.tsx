"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [queryText, setQuerytext] = useState<string>("");

  function handleQuery(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("query", value);
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  }

  return (
    <div className="flex items-center h-12 rounded-xl border-[1.5px] border-neutral-300">
      <input
        className="h-full w-60 px-4"
        type="text"
        value={queryText}
        onChange={(e) => {
          setQuerytext(e.target.value);
        }}
      />
      <button
        onClick={() => {
          handleQuery(queryText);
        }}
        className="bg-black text-white h-full rounded-xl aspect-square place-items-center"
      >
        <Search className="" />
      </button>
    </div>
  );
}
