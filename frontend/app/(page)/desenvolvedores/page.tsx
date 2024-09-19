"use client"

import { DataTable } from "@/components/DataTable";
import { useDesenvolvedoresGetAll } from "@/services/desenvolvedores.service";
import { columns } from "./columns";

export default function Desenvolvedores() {
  const {data} = useDesenvolvedoresGetAll()
  console.log('data', data)
  return(
    <DataTable
      columns={columns}
      data={data ? data : []}
    />
  )
}
