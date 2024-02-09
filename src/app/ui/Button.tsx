import { ButtonHTMLAttributes, forwardRef } from "react";

type Props = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { icon, children, ...rest } = props;

  return (
    <button
      ref={ref}
      type="button"
      className="inline-flex items-center gap-x-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
});

Button.displayName = "Button";
