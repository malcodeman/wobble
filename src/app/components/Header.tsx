import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="container mx-auto p-4">
      <nav className="text-white">
        <Link
          href="/"
          className={clsx("mr-2", pathname === "/" && "text-indigo-500")}
        >
          Home
        </Link>
        <Link
          href="/templates"
          className={clsx(
            "mr-2",
            pathname === "/templates" && "text-indigo-500",
          )}
        >
          Templates
        </Link>
      </nav>
    </header>
  );
};
