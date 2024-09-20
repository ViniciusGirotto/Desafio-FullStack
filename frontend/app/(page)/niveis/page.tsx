"use client";

import { DataTable } from "@/components/DataTable";
import HeaderPage from "@/components/HeaderPage";
import Loader from "@/components/Loader";
import { PaginationComponent } from "@/components/Pagination";
import { useNiveisPagination } from "@/services/niveis.service";
import { useEffect, useState } from "react";
import { columns } from "./columns";

export default function Niveis() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data: niveis, isFetching } = useNiveisPagination(page, search);

  useEffect(() => {
    if (niveis && page > niveis.meta.last_page) {
      setPage(niveis.meta.last_page);
    }
  }, [niveis, page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = (search: string) => {
    setSearch(search);
  };



  return (
    <>
      <HeaderPage title="Niveis" onSearch={handleSearch} />
      {isFetching ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={niveis ? niveis.data : []} />
      )}
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