"use client";

import { NavBar } from "@/components/Nav";







export function Header() {
  return (
    <header>
      <div className="w-[95%] p-8 gap-4 mx-auto ">
        <NavBar
            containerStyles="hidden xl:flex gap-x-8 items-center"
            linkStyles="relative hover:text-red-700 transition-all"
            underLineStyles="absolute left-0 top-full h-[2px] bg-red-500 w-full"
        />

      </div>
    </header>
  );
};


