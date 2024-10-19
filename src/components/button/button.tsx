import React from "react";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import cn from "classnames";
import ButtonDrip from "@/components/button/button-drip";
import ButtonLoader from "@/components/button/button-loader";
import { LoaderSizeTypes, LoaderVariantTypes } from "@/components/loader";

type ShapeNames = "rounded" | "pill" | "circle";
type ColorNames =
  | "primaryOutline"
  | "primarySolid"
  | "primaryTransparent"
  | "grayOutline"
  | "graySolid"
  | "grayTransparent"
  | "successOutline"
  | "successSolid"
  | "successTransparent"
  | "warningOutline"
  | "warningSolid"
  | "warningTransparent"
  | "errorOutline"
  | "errorSolid"
  | "errorTransparent";
type SizeNames = "mini" | "small" | "medium" | "large";

const shapes: Record<ShapeNames, string> = {
  rounded: "rounded-md sm:rounded-lg",
  pill: "rounded-full",
  circle: "rounded-full",
};

const colorThemes: Record<ColorNames, string> = {
  primaryOutline: "border-primary-500 text-primary-500 bg-white",
  primarySolid: "border-primary-500 text-white bg-primary-500",
  primaryTransparent: "border-none text-neutral-500 bg-primary-transparent",
  grayOutline: "border-gray-400 text-gray-400 bg-white",
  graySolid: "border-gray-400 text-white bg-gray-400",
  grayTransparent: "border-white text-neutral-500 bg-[#6b72804d]",
  successOutline: "border-success-500 text-success-500 bg-white",
  successSolid: "border-success-500 text-white bg-success-500",
  successTransparent: "border-white text-neutral-500 bg-success-transparent",
  warningOutline: "border-warning-500 text-warning-500 bg-white",
  warningSolid: "border-warning-500 text-white bg-warning-500",
  warningTransparent: "border-white text-neutral-500 bg-warning-transparent",
  errorOutline: "border-error-500 text-error-500 bg-white",
  errorSolid: "border-error-500 text-white bg-error-500",
  errorTransparent: "border-white text-neutral-500 bg-error-transparent",
};

const sizes: Record<SizeNames, string> = {
  mini: "py-1 px-4 border text-xs xl:text-sm 3xl:text-base",
  small: "py-2 px-4 border text-xs xl:text-sm 3xl:text-base",
  medium: "py-2.5 px-8 border-2 text-sm xl:text-base 3xl:text-lg",
  large: "py-3 px-8 border-2 text-sm xl:text-base 3xl:text-lg",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  disabled?: boolean;
  shape?: ShapeNames;
  color?: ColorNames;
  size?: SizeNames;
  fullWidth?: boolean;
  loaderSize?: LoaderSizeTypes;
  loaderVariant?: LoaderVariantTypes;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      isLoading,
      disabled,
      fullWidth,
      shape = "rounded",
      color = "primarySolid",
      size = "medium",
      loaderSize = "small",
      loaderVariant = "scaleUp",
      onClick,
      ...buttonProps
    },
    ref: React.Ref<HTMLButtonElement | null>,
  ) => {
    const [dripShow, setDripShow] = useState<boolean>(false);
    const [dripX, setDripX] = useState<number>(0);
    const [dripY, setDripY] = useState<number>(0);
    const colorClassNames = colorThemes[color];
    const buttonRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => buttonRef.current);
    function dripCompletedHandle() {
      setDripShow(false);
      setDripX(0);
      setDripY(0);
    }
    const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!isLoading && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDripShow(true);
        setDripX(event.clientX - rect.left);
        setDripY(event.clientY - rect.top);
      }
      if (onClick) onClick(event);
    };

    const buttonDripColor = "rgba(255, 255, 255, 0.3)";

    return (
      <button
        ref={buttonRef}
        onClick={clickHandler}
        className={cn(
          "relative overflow-hidden whitespace-pre transition-all font-semibold",
          !disabled
            ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md focus:-translate-y-0.5 focus:shadow-md"
            : "cursor-not-allowed",
          colorClassNames,
          fullWidth ? "w-full" : "w-fit",
          shapes[shape],
          sizes[size],
          className,
        )}
        disabled={disabled}
        {...buttonProps}
      >
        <span
          className={cn(
            "flex items-center justify-center gap-2",
            isLoading && "invisible opacity-0",
          )}
        >
          {children}
        </span>

        {isLoading && (
          <ButtonLoader size={loaderSize} variant={loaderVariant} />
        )}

        {dripShow && (
          <ButtonDrip
            x={dripX}
            y={dripY}
            color={
              ["white", "gray"].indexOf(color) !== -1
                ? "rgba(0, 0, 0, 0.1)"
                : buttonDripColor
            }
            fullWidth={fullWidth}
            onCompleted={dripCompletedHandle}
          />
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
