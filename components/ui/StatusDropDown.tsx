"use client";

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({
  options,
  onSelect,
  label,
  selectedOption,
  setSelectedOption,
}: {
  label: string;
  options: { id?: string; label: string }[];
  onSelect: (value: { id?: string; label: string }) => void;
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

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

  const handleSelect = (option: { id?: string; label: string }) => {
    onSelect(option);
    setSelectedOption(option.label);
    setOpen(false);
  };

  return (
    <div
      ref={dropDownRef}
      className="relative flex w-fit items-center gap-3 rounded-md border border-neutral-200 px-2 py-1.5 md:px-3"
    >
      <span className="text-xs text-neutral-500 whitespace-nowrap">
        {label}
      </span>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`flex min-w-24 items-center justify-between gap-3 rounded-sm border px-3 py-1.5 text-xs transition-colors duration-200 ${
          open
            ? "border-neutral-900 bg-neutral-50"
            : "border-neutral-200 bg-white hover:border-neutral-400"
        }`}
      >
        <span className="truncate">{selectedOption}</span>

        <ChevronDown
          size={14}
          strokeWidth={1.7}
          className={`shrink-0 text-neutral-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-md border border-neutral-200 bg-white py-1 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
        >
          {options.map((option) => {
            const isSelected = option.label === selectedOption;

            return (
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                key={option.id || option.label}
                onClick={() => handleSelect(option)}
                className={`flex w-full items-center px-3 py-2.5 text-left text-xs transition-colors ${
                  isSelected
                    ? "bg-neutral-100 font-medium"
                    : "hover:bg-neutral-50"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
