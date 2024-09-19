"use client";

import { DataTable } from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";
import Loader from "@/components/Loader";
import { PaginationComponent } from "@/components/Pagination";
import { useDevsPagination } from "@/services/desenvolvedores.service";
import { useState } from "react";
import { columns } from "./columns";

export default function Desenvolvedores() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: devs, isFetching } = useDevsPagination(page, search);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <>
      <HeaderPage title="Desenvolvedores" onSearch={handleSearch} />
      {isFetching ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={devs ? devs.data : []} />
      )}
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
