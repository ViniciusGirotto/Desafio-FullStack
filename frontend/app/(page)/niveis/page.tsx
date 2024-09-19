"use client";

import { DataTable } from "@/components/DataTable";
import { useNiveisPagination } from "@/services/niveis.service";
import { columns } from "./columns";
import HeaderPage from "@/components/HeaderPage";
import { PaginationComponent } from "@/components/Pagination";
import { useState } from "react";

export default function Niveis() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: niveis } = useNiveisPagination(page, search);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <>
      <HeaderPage title="Niveis" onSearch={handleSearch} />
      <DataTable columns={columns} data={niveis ? niveis.data : []} />
      <div className="flex mt-2 !justify-end">
        <PaginationComponent
          total={niveis?.meta.total}
          perPage={niveis?.meta.per_page}
          currentPage={niveis?.meta.current_page}
          lastPage={niveis?.meta.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}