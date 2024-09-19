"use client";

import { DataTable } from "@/components/DataTable";
import { useNiveisGetAll } from "@/services/niveis.service";
import { columns } from "./columns";
import HeaderPage from "@/components/HeaderPage";




export default function Niveis() {
  const { data } = useNiveisGetAll()
  console.log('data', data)
  return (
    <>
      <HeaderPage title="Níveis" />
      <DataTable
        columns={columns}
        data={data ? data : []}
      />
    </>
  )
}