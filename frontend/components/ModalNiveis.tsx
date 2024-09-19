import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Devs, Niveis } from "@/app/(page)/desenvolvedores/columns";
import { toast } from "@/hooks/use-toast";
import { useCreateNivel, useUpdateNivel } from "@/services/niveis.service";
import { queryClient } from "@/utils/ReactQueryProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Loader from "./Loader";

interface ModalDevsProps {
  nivel?: Niveis;
  isEditMode: boolean;
}

const devCreateSchema = z.object({
  nivel: z.string().min(2, { message: "Nivel é obrigatório" }),
});

type FormDataType = z.infer<typeof devCreateSchema>;

export function ModalNivel({ nivel, isEditMode }: ModalDevsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormDataType>({
    resolver: zodResolver(devCreateSchema),
    defaultValues: {
      nivel: "",
    },
  });

  useEffect(() => {
    if (isEditMode && nivel) {
      form.setValue("nivel", nivel.nivel);
    }
  }, [isEditMode, nivel, form]);

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

  const { mutateAsync: createNivelFn, isPending: isPendingCreate } = useMutation({
    mutationFn: useCreateNivel.fn,
    onSuccess: () => {
      form.reset();
      setIsOpen(false);
      toast({
        title: "Nivel cadastrado com sucesso!",
      });
      queryClient.invalidateQueries({queryKey: ["useNiveisPaginationKey"]});
    },
    onError: () => {
      toast({
        title: "Erro ao cadastrar nivel",
        variant: "destructive",
      });
    },
  });

  const { mutateAsync: updateNivelFn, isPending: isPendingUpdate } = useMutation({
    mutationFn: useUpdateNivel.fn,
    onSuccess: () => {
      form.reset();
      setIsOpen(false);
      toast({
        title: "Nivel atualizado com sucesso!",
      });
      queryClient.invalidateQueries({queryKey: ["useNiveisPaginationKey"]});
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar niveil",
        variant: "destructive",
      });
    },
  });

  const isPending = isPendingCreate || isPendingUpdate;

  const handleSubmit = async (values: FormDataType) => {
    const payload = {
      nivel: values.nivel,
    };

    if (isEditMode && nivel) {
      await updateNivelFn({
        id: nivel.id,
        ...payload,
      });
    } else {
      await createNivelFn(payload);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <EditIcon className="cursor-pointer" />
        ) : (
          <Button variant="default">Cadastrar</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar nível" : "Cadastrar nível"}
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para {isEditMode ? "editar" : "cadastrar"}{" "}
            um nível.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="createNivelForm"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="nivel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do nivel..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          </form>
        </Form>
        <DialogFooter>
          <Button form="createNivelForm" type="submit">
            {isEditMode ? "Salvar alterações" : "Salvar"}
            {isPending && <Loader/>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
