"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { Niveis } from "../desenvolvedores/columns"
import { ModalNivel } from "@/components/ModalNiveis"
import { DeleteModal } from "@/components/DeleteModal"

export const columns: ColumnDef<Niveis>[] = [
    {
        accessorKey: "nivel",
        header: "Nível",
        cell: ({ row }) => {
            const nivel = row.getValue<string>("nivel");
            return (
                <div className="capitalize flex-1">
                    {nivel}
                </div>
            );
        },
        enableSorting: true,
        size: 100
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const nivel = row.original;
          return (
            <div className="flex flex-row justify-end items-center gap-x-2">
              <ModalNivel nivel={nivel} isEditMode={true} />
              <DeleteModal itemName="nivel" id={nivel.id}/>
            </div>
          );
        },
    }
]