import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string; // Add a label prop
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, label, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (props.onFocus) props.onFocus(e);
    };
    // Calculate dynamic translate-x based on label length
    const translateX = label.length > 13 ? '-translate-x-8' : '-translate-x-5';

    const {onBlur, ...rest} = props;

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border border-[#cfc4d6] bg-[#fafbfc] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-opacity-25 focus-visible:ring-[#0d6efd40] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          onFocus={handleFocus}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          {...rest}
        />
        <label
          htmlFor={props.id}
          className={cn(
            "absolute left-3 top-0 px-1 text-[#565a5d] font-semibold transition-all",
            isFocused || props.value ? `transform text-sm font-semibold translate-y-1 ${translateX} scale-75` : "transform translate-y-4 scale-1"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };