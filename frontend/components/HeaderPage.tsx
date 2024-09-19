import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderPageProps {
    title: string;
}

export default function HeaderPage({ title }: HeaderPageProps) {
    return (
        <div className="flex flex-col">
            <h1 className="mb-2 tracking-wider text-3xl font-extrabold">{title}</h1>
            <div className="flex justify-between items-center py-4">
                <Input
                    placeholder={`Buscar ${title}`}
                    className="max-w-sm"
                />
                <Button>
                    Cadastrar
                </Button>
            </div>
        </div>
    )
}