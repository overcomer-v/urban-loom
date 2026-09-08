"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function Dropdown({
  options,
  onSelect,
  label,
  selectedOption,
  setSelectedOption,
}: {
  label: string;
  // initialOption?: { id?: string; label: string };
  options: { id?: string; label: string }[];
  onSelect: (value: { id?: string; label: string }) => void;
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(initialOption?.label);
  const dropDownRef = useRef<HTMLButtonElement>(null);

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
    <div className="w-fit z-50 border border-neutral-200 rounded-md p-2 px-2 md:px-3 gap-4  relative flex items-center">
      <p className=" text-neutral-500 text-xs text-nowrap">{label}</p>

      <button
        ref={dropDownRef}
        onClick={() => setOpen(!open)}
        className="w-full min-w-22 flex justify-between text-xs items-center border-neutral-200 border px-3 py-1 rounded-sm"
      >
        {selectedOption?.split(" ", 1)}
        <span>▼</span>
      </button>

      {open && (
        <div className="absolute left-0 top-11 border border-neutral-200 right-0 mt-2 rounded-md bg-white shadow-lg">
          {options.map((opt) => (
            <div
              key={opt.id || opt.label}
              onClick={() => {
                onSelect(opt);
                setSelectedOption(opt.label);
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-xs"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
