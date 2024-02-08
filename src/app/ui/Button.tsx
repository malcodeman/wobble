type Props = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const Button = (props: Props) => {
  const { icon, children, ...rest } = props;

  return (
    <button
      type="button"
      className="inline-flex items-center gap-x-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
};
