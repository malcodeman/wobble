import React, { Fragment } from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import clsx from "clsx";

export const MenuButton = ({
  icon,
  children,
  ...rest
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <HeadlessMenu.Button
      className="inline-flex items-center gap-x-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      {...rest}
    >
      <span className="sr-only">Open options</span>
      {icon}
      {children}
    </HeadlessMenu.Button>
  );
};

export const MenuList = ({
  children,
  placement = "bottom-start",
}: {
  children: React.ReactNode;
  placement?: "bottom-start" | "bottom-end";
}) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <HeadlessMenu.Items
        className={clsx(
          "absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-[#29303d] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
          placement === "bottom-start" ? "right-0" : "left-0",
        )}
      >
        <div className="p-2">{children}</div>
      </HeadlessMenu.Items>
    </Transition>
  );
};

type MenuItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export const MenuItem = (props: MenuItemProps) => {
  const { children, icon, className, ...rest } = props;

  return (
    <HeadlessMenu.Item {...rest}>
      {({ active }) => (
        <button
          className={clsx(
            "inline-flex w-full items-center gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
            active && "bg-indigo-500",
            className,
          )}
        >
          {icon}
          {children}
        </button>
      )}
    </HeadlessMenu.Item>
  );
};

type Props = {
  children: React.ReactNode;
};

export const Menu = (props: Props) => {
  const { children } = props;

  return (
    <HeadlessMenu as="div" className="relative inline-block text-left">
      {children}
    </HeadlessMenu>
  );
};
