"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const path = usePathname();
  return (
    <ul className="flex max-[767px]:flex-col md:items-center gap-4 text-base">
      <Link href="/" className={path === "/" ? " text-black" : "text-gray-600"}>
        <li>Home</li>
      </Link>
      <Link
        href="/fleet"
        className={
          path.startsWith("/fleet")
            ? "text-black"
            : "text-gray-600 lg:hover:text-black"
        }
      >
        <li>Fleet</li>
      </Link>
      <Link
        href="/about"
        className={
          path.startsWith("/about")
            ? "text-black"
            : "text-gray-600 lg:hover:text-black"
        }
      >
        <li>About</li>
      </Link>
      <Link
        href="/contact"
        className={
          path.startsWith("/contact")
            ? "text-black"
            : "text-gray-600 lg:hover:text-black"
        }
      >
        <li>Contact</li>
      </Link>
    </ul>
  );
}
