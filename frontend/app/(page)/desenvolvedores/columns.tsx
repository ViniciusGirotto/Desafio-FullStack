"use client";

import { DeleteModal } from "@/components/DeleteModal";
import { ModalDevs } from "@/components/ModalDevs";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export type Niveis = {
  id: number;
  nivel: string;
  devCount: number;
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
      const dataNascimento = row.getValue<string>("data_nascimento");
      if (dataNascimento) {
        const formattedDate = format(parseISO(dataNascimento), "dd/MM/yyyy", {
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
          <DeleteModal itemName="dev" id={devs.id} />
        </div>
      );
    },
  },
];
