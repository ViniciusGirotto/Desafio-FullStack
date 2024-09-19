"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ModalDevs } from "@/components/ModalDevs";
import { Trash2Icon } from "lucide-react";
import { DeleteModal } from "@/components/DeleteModal";

export type Niveis = {
  id: number;
  nivel: string;
};

export type Devs = {
  id: number;
  nivel_id: number;
  nome: string;
  sexo: string;
  data_nascimento: Date;
  idade: number;
  hobby: string;
  nivel: Niveis;
};

export const columns: ColumnDef<Devs>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
    enableSorting: true,
  },
  {
    accessorKey: "idade",
    header: "Idade",
    enableSorting: true,
  },
  {
    accessorKey: "sexo",
    header: "Sexo",
    enableSorting: true,
    cell: ({ row }) => {
      const sexo = row.getValue<string>("sexo");
      return (
        <div className="capitalize">
          {sexo === "F" ? "Feminino" : "Masculino"}
        </div>
      );
    },
  },
  {
    accessorKey: "data_nascimento",
    header: "Data de Nascimento",
    enableSorting: true,
    cell: ({ row }) => {
      const dataNascimento = row.getValue<Date>("data_nascimento");
      if (dataNascimento) {
        const formattedDate = format(new Date(dataNascimento), "dd/MM/yyyy", {
          locale: ptBR,
        });
        return <div>{formattedDate}</div>;
      }
    },
  },
  {
    accessorKey: "hobby",
    header: "Hobby",
    enableSorting: true,
  },
  {
    accessorKey: "nivel",
    header: "Nível",
    enableSorting: true,
    cell: ({ row }) => {
      const nivel = row.getValue<Niveis>("nivel");
      return <div className="capitalize">{nivel?.nivel}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const devs = row.original;
      return (
        <div className="flex flex-row justify-end items-center gap-x-2">
          <ModalDevs developer={devs} isEditMode={true} />
          <DeleteModal itemName="dev" id={devs.id}/>
        </div>
      );
    },
  },
];