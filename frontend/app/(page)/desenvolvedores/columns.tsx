"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

export type Niveis = {
    id: number
    nivel: string
}

export type Devs = {
    id: number
    nivel_id: number
    nome: string
    sexo: string
    data_nascimento: Date
    idade: number
    hobby: string
    nivel: Niveis
}

export const columns: ColumnDef<Devs>[] = [
    {
        accessorKey: "nome",
        header: "Nome",
    },
    {
        accessorKey: "idade",
        header: "Idade",
    },
    {
        accessorKey: "sexo",
        header: "Sexo",
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
        cell: ({ row }) => {
            const dataNascimento = row.getValue<Date>("data_nascimento");
            if(dataNascimento){
                const formattedDate = format(new Date(dataNascimento), 'dd/MM/yyyy', { locale: ptBR });
                return <div>{formattedDate}</div>;
            }
        },
    },
    {
        accessorKey: "hobby",
        header: "Hobby",
    },
    {
        accessorKey: "nivel",
        header: "Nível",
        cell: ({ row }) => {
            const nivel = row.getValue<Niveis>("nivel");
            return (
                <div className="capitalize">
                    {nivel?.nivel}
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const devs = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(devs.nome)}
                        >
                            Copiar Nome
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]