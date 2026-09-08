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
    <div className="flex items-center ">
      <form
        onSubmit={() => {
          handleQuery(queryText);
        }}
      >
        {" "}
        <input
          className="w-70 px-4 h-10 text-sm rounded-l-md border outline-0 border-r-0 border-neutral-300"
          type="text"
          value={queryText}
          onChange={(e) => {
            setQuerytext(e.target.value);
          }}
        />
      </form>

      <button
        onClick={() => {
          handleQuery(queryText);
        }}
        className="bg-black text-white h-10 w-10  rounded-r-md aspect-square place-items-center"
      >
        <Search className="" size={20} />
      </button>
    </div>
  );
}
