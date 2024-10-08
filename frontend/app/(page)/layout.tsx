"use client";

import { Header } from "@/components/Header";
import { Menubar } from "@/components/ui/menubar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="w-[95%] p-8 gap-4 mt-10 mx-auto rounded-xl">
        {children}
      </div>
    </>
  );
}
