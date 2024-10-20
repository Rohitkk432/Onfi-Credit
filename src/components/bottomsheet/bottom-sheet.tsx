import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import cn from "classnames";
import { useLockBodyScroll } from "@/lib/hooks/use-lock-body-scroll";

interface BottomSheetProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const BottomSheet: React.FC<React.PropsWithChildren<BottomSheetProps>> = ({
  children,
  isOpen,
  setIsOpen,
  className,
}) => {
  useLockBodyScroll(isOpen);
  return (
    <div
      className={`fixed inset-0 w-full h-full z-[100] bg-[#0000004d] transition-all sm:transition-none ease-in-out duration-300   ${isOpen ? "visible" : "invisible"}`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={cn(
          `absolute bottom-0 sm:bottom-auto sm:top-[50%] sm:left-[50%]  bg-white border border-gray-100 w-full sm:w-auto rounded-t-2xl sm:rounded-2xl shadow-xl z-[101] flex flex-col p-1 h-fit transition-all sm:transition-none sm:translate-x-[-50%] sm:translate-y-[-50%] ease-in-out duration-300 
                    ${!isOpen && "translate-y-[100%]"}`,
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full py-2 px-2 flex justify-end">
          <XMarkIcon
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="w-6 h-6 cursor-pointer"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
