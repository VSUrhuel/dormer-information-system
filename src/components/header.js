"use client"; // ✅ Add `use client` pragma
import { Home } from "lucide-react";
import React from "react";
import { useTheme } from "next-themes";
import Link from "next/link"; // ✅ Import `Link`
import clsx from "clsx"; // ✅ Use `clsx` for classnames
import ModeToggle from "./mode-toggle";

export default function Header() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 shadow-sm w-full backdrop-blur bg-background/95 border-b border-muted supports-[backdrop-filter]:bg-backdrop/60">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="#">
          <div className="flex items-center gap-2 cursor-pointer">
            <Home
              size={24}
              className={"text-blue"} // ✅ Use `clsx` for proper Tailwind handling
            />
            <h1 className="text-lg font-semibold">Home</h1>
            <ModeToggle />
          </div>
        </Link>
      </div>
    </header>
  );
}
