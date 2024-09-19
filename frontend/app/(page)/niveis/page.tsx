"use client";

import { DataTable } from "@/components/DataTable";
import { useNiveisGetAll } from "@/services/niveis.service";
import { columns } from "./columns";



export default function Niveis() {
  const {data} = useNiveisGetAll()
  console.log('data', data)
  return(
    <DataTable 
      columns={columns}
      data={data ? data : []}
    />
  )
}