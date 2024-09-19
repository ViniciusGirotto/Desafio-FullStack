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
      queryClient.invalidateQueries({ queryKey: ["useDevsPaginationKey"] });
    },
    onError: () => {
      toast({
        title: "Erro ao deletar desenvolvedor",
        variant: "destructive",
      });
    },
  });

  const { mutateAsync: deleteItemNivel } = useMutation({
    mutationFn: useDeleteNivel.fn,
    onSuccess: () => {
      toast({
        title: "Nivel deletado com sucesso!",
      });
      queryClient.invalidateQueries({ queryKey: ["useNiveisPaginationKey"] });
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

  const handleSubmit = () => {
    if (itemName === "dev") {
      deleteItemDev(id);
    } else {
      deleteItemNivel(id);
    }
  };

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
          <AlertDialogAction
            onClick={handleSubmit}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
