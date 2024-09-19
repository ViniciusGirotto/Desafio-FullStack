"use client";

import { DataTable } from "@/components/DataTable";
import {
  useDesenvolvedoresGetAll,
  useDevsPagination,
} from "@/services/desenvolvedores.service";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HeaderPage from "@/components/HeaderPage";
import { PaginationComponent } from "@/components/Pagination";
import { useState } from "react";

export default function Desenvolvedores() {
  const [page, setPage] = useState(1);
  const { data: devs } = useDevsPagination(page);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <HeaderPage title="Desenvolvedores" />
      <DataTable columns={columns} data={devs ? devs.data : []} />
      <div className="flex mt-2 !justify-end">
        <PaginationComponent
          total={devs?.meta.total}
          perPage={devs?.meta.per_page}
          currentPage={devs?.meta.current_page}
          lastPage={devs?.meta.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
