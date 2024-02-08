import { InputHTMLAttributes, useId } from "react";

type Props = {
  label: string;
  rightSection?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: Props) => {
  const { label, rightSection, ...rest } = props;
  const inputId = useId();

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          id={inputId}
          type="text"
          className="block w-full rounded-md border-0 bg-white/10 px-2.5 py-1.5 pr-12 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          {...rest}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-white sm:text-sm">{rightSection}</span>
        </div>
      </div>
    </div>
  );
};
