import React, { useState } from "react";
export { RadioGroup } from "@headlessui/react";
import { motion } from "framer-motion";
import cn from "classnames";
import { RadioGroup } from "@headlessui/react";
interface ToggleBtnProps {
  label?: string;
  option1: string;
  option2: string;
  className?: string;
  stateChoosen?: string;
  setStateChoosen?: React.Dispatch<React.SetStateAction<string>>;
}

const ToggleBtn: React.FC<ToggleBtnProps> = ({
  option1,
  option2,
  label,
  className,
  stateChoosen,
  setStateChoosen,
}) => {
  const [status, setStatus] = useState(option1);
  return (
    <div className="flex flex-row items-center justify-start">
      {label && <div className="mr-2 text-lg lg:text-xl">{label}:</div>}
      <RadioGroup
        value={
          stateChoosen !== undefined && setStateChoosen !== undefined
            ? stateChoosen
            : status
        }
        onChange={
          stateChoosen !== undefined && setStateChoosen !== undefined
            ? setStateChoosen
            : setStatus
        }
        className="flex items-center sm:gap-1 bg-gray-100 rounded-lg"
      >
        <RadioGroup.Option value={option1}>
          {({ checked }) => (
            <span
              className={cn(
                "relative flex cursor-pointer px-6 py-2 text-sm lg:text-base items-center justify-center rounded-lg text-center font-semibold tracking-wider",
                checked ? "text-white" : "text-black/50",
                className,
              )}
            >
              {checked && (
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-primary-500 shadow-large"
                  layoutId="statusIndicator"
                />
              )}
              <span className="relative">{option1}</span>
            </span>
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value={option2}>
          {({ checked }) => (
            <span
              className={cn(
                "relative flex cursor-pointer px-6 py-2 text-sm lg:text-base items-center justify-center rounded-lg text-center font-semibold tracking-wider",
                checked ? "text-white" : "text-black/50",
                className,
              )}
            >
              {checked && (
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-primary-500 shadow-large"
                  layoutId="statusIndicator"
                />
              )}
              <span className="relative">{option2}</span>
            </span>
          )}
        </RadioGroup.Option>
      </RadioGroup>
    </div>
  );
};

export default ToggleBtn;
