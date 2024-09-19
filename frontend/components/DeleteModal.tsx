import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useDeleteDevs } from "@/services/desenvolvedores.service";
import { useDeleteNivel } from "@/services/niveis.service";
import { queryClient } from "@/utils/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import Loader from "./Loader";
import { Button } from "./ui/button";
import { useState } from "react";

interface DeleteModalProps {
  itemName: string;
  id: number;
}

export function DeleteModal({ itemName, id }: DeleteModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: deleteItemDev, isPending: isPendingDev } = useMutation({
    mutationFn: useDeleteDevs.fn,
    onSuccess: () => {
      toast({
        title: "Desenvolvedor deletado com sucesso!",
      });
      queryClient.invalidateQueries({ queryKey: ["useDevsPaginationKey"] });
      setIsOpen(false);
    },
    onError: () => {
      toast({
        title: "Erro ao deletar desenvolvedor",
        variant: "destructive",
      });
    },
  });

  const { mutateAsync: deleteItemNivel, isPending: isPendingNivel } = useMutation({
    mutationFn: useDeleteNivel.fn,
    onSuccess: () => {
      toast({
        title: "Nivel deletado com sucesso!",
      });
      queryClient.invalidateQueries({ queryKey: ["useNiveisPaginationKey"] });
      setIsOpen(false);
    },
    onError: (error : any) => {
      console.log('error', error);  
      toast({
        title: "Erro ao deletar nivel",
        variant: "destructive",
        description: error.response.data.error,
      });
    },
  });

  const isPending = isPendingDev || isPendingNivel;

  const handleSubmit = () => {
    if (itemName === "dev") {
      deleteItemDev(id);
    } else {
      deleteItemNivel(id);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Trash2Icon className="w-6 h-6 text-red-500 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black">
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Você deseja realmente excluir {itemName}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button
            onClick={handleSubmit}
            type="button"
          >
            Continuar
            {isPending && <Loader/>}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
