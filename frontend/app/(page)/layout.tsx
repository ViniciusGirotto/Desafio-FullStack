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
      {children}
    </>
  );
}
