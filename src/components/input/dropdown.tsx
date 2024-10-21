import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";

interface DropdownProps {
  className?: string;
  selectClassName?: string;
  // eslint-disable-next-line
  options: any[];
  // eslint-disable-next-line
  selected: any;
  // eslint-disable-next-line
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  dataKey?: string;
  dropdownHeight?: string;
  selectPlaceholder?: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  className,
  selectClassName,
  options,
  selected,
  setSelected,
  dropdownHeight,
  dataKey,
  selectPlaceholder,
  disabled,
}) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref for the dropdown element

  // Close the dropdown when clicking outside
  useEffect(() => {
    if (disabled === true) {
      setOpen(false);
    } else {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };

      // Attach the event listener when the component mounts
      document.addEventListener("click", handleClickOutside);

      // Clean up the event listener when the component unmounts
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [dropdownRef, disabled]);

  return (
    <div
      ref={dropdownRef}
      className={cn(
        `relative text-base lg:text-lg  disable-text-select flex flex-col`,
        className,
      )}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (disabled === true) return;
          setOpen(!open);
        }}
        className={cn(
          `px-2 py-2 border-2 ${open ? "border-blue-500" : selected !== "" && selected !== undefined && selected !== null ? "border-primary-500" : "border-gray-400"} flex justify-between items-center rounded-lg ${disabled ? "cursor-not-allowed" : ""}`,
          selectClassName,
        )}
      >
        <div className="px-4">
          {selected !== "" && selected !== undefined && selected !== null
            ? dataKey !== undefined
              ? selected[dataKey]
              : selected
            : selectPlaceholder !== undefined
              ? selectPlaceholder
              : "Select Option"}
        </div>
        <ChevronUpDownIcon className="w-5 h-5" />
      </div>
      <div
        className={`absolute w-full px-2 h-[16rem] overflow-scroll top-[110%] z-[200] bg-white flex-col items-center shadow-lg border border-gray-100 rounded-lg ${open ? "flex" : "hidden"}`}
        style={dropdownHeight ? { height: dropdownHeight } : {}}
      >
        {options.map((opt, idx) => {
          return (
            <div
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(opt);
                setOpen(false);
              }}
              className={`py-3 px-4 w-full flex items-center justify-between gap-2 text-center whitespace-pre ${idx !== 0 ? "border-t border-gray-300" : ""}`}
            >
              <div className="">
                {dataKey !== undefined ? opt[dataKey] : opt}
              </div>
              {JSON.stringify(selected) === JSON.stringify(opt) ? (
                <CheckIcon className="w-5 h-5 text-primary-500" />
              ) : (
                <div className="w-5 h-5"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
