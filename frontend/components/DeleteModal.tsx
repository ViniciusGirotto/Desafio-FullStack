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
import { queryClient } from "@/utils/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";

interface DeleteModalProps {
  itemName: string;
  id: number;
}

export function DeleteModal({ itemName, id }: DeleteModalProps) {
  const { mutateAsync: deleteItemDev } = useMutation({
    mutationFn: useDeleteDevs.fn,
    onSuccess: () => {
      toast({
        title: "Desenvolvedor deletado com sucesso!",
      });
      queryClient.invalidateQueries({
        queryKey: ["useDesenvolvedoresGetAllKey"],
      });
    },
    onError: () => {
      toast({
        title: "Erro ao deletar desenvolvedor",
        variant: "destructive",
      });
    },
  });

  return (
    <AlertDialog>
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
          <AlertDialogAction onClick={()=>{deleteItemDev(id)}}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
