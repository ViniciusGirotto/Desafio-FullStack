import { useDebounce } from "@/hooks/use-debounce";
import { ModalDevs } from "./ModalDevs";
import { ModalNivel } from "./ModalNiveis";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";

interface HeaderPageProps {
  title: string;
  onSearch: (search: string) => void;
}

export default function HeaderPage({ title, onSearch }: HeaderPageProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <div className="flex flex-col">
      <h1 className="mb-2 tracking-wider text-3xl font-extrabold">{title}</h1>
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder={`Buscar ${title}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        {title === "Desenvolvedores" && <ModalDevs isEditMode={false} />}
        {title === "Niveis" && <ModalNivel isEditMode={false} />}
      </div>
    </div>
  );
}
