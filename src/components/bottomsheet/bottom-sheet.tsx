import React, { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import cn from "classnames";

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
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          bottomSheetRef.current &&
          !bottomSheetRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      // Attach the event listener when the component mounts
      document.addEventListener("click", handleClickOutside);

      // Clean up the event listener when the component unmounts
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [bottomSheetRef, isOpen]);

  return isOpen ? (
    <div
      ref={bottomSheetRef}
      className={cn(
        `fixed inset-auto bottom-0 sm:bottom-auto bg-white border border-gray-100 w-full sm:w-auto rounded-t-2xl sm:rounded-2xl shadow-xl z-[100] flex flex-col p-1`,
        className,
      )}
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
  ) : (
    <></>
  );
};

export default BottomSheet;
