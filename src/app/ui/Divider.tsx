import clsx from "clsx";

type Props = {
  className?: string;
};

export const Divider = (props: Props) => {
  const { className } = props;

  return <div className={clsx("w-full border-t border-white/10", className)} />;
};
