"use client"

import { DataTable } from "@/components/DataTable";
import { useDesenvolvedoresGetAll } from "@/services/desenvolvedores.service";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HeaderPage from "@/components/HeaderPage";

export default function Desenvolvedores() {
  const { data } = useDesenvolvedoresGetAll()
  return (
    <>
      <HeaderPage title="Desenvolvedores" />
      <DataTable
        columns={columns}
        data={data ? data : []}
      />
    </>
  )
}
