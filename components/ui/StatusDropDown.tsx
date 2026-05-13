"use client";

import { useEffect, useRef, useState } from "react";

export default function Dropdown({
  options,
  onSelect,
  label,
}: {
  label: string;
  options: { id?: string; label: string }[];
  onSelect: (value: { id?: string; label: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleClose);

    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, []);

  return (
    <div className="w-52 border-2 border-neutral-400 rounded-md p-2 px-4 gap-4  relative flex items-center">
      <p className=" text-neutral-500 text-sm">{label}</p>

      <button
        ref={dropDownRef}
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between text-sm items-center border-neutral-200 border px-3 py-1 rounded-sm"
      >
        {selectedOption}
        <span>▼</span>
      </button>

      {open && (
        <div className="absolute left-0 top-11 border border-neutral-200 right-0 mt-2 rounded-md bg-white shadow-lg">
          {options.map((opt) => (
            <div
              key={opt.id || opt.label
              }
              onClick={() => {
                onSelect(opt);
                setSelectedOption(opt.label);
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
