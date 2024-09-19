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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "./ui/calendar";
import clsx from "clsx";
import { format } from "date-fns";
import { Select } from "./Select";
import { generos } from "@/lib/utils";
import {
  useCreateDevs,
  useUpdateDevs,
} from "@/services/desenvolvedores.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useNiveisGetAll } from "@/services/niveis.service";
import { Devs, Niveis } from "@/app/(page)/desenvolvedores/columns";
import { useState, useEffect } from "react";
import { EditIcon } from "lucide-react";
import { queryClient } from "@/utils/ReactQueryProvider";
import { ptBR } from "date-fns/locale";

interface ModalDevsProps {
  developer?: Devs;
  isEditMode: boolean;
}

const devCreateSchema = z.object({
  nome: z.string().min(2, { message: "Nome é obrigatório" }),
  genero: z.string({ required_error: "Sexo é obrigatório" }),
  dob: z.date({ required_error: "Data de nascimento é obrigatória" }),
  hobby: z.string().min(2, { message: "Hobby é obrigatório" }),
  nivel: z.string({ required_error: "Nível é obrigatório" }),
});

type FormDataType = z.infer<typeof devCreateSchema>;

export function ModalDevs({ developer, isEditMode }: ModalDevsProps) {
  const { data: niveis } = useNiveisGetAll();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormDataType>({
    resolver: zodResolver(devCreateSchema),
    defaultValues: {
      nome: "",
      hobby: "",
    },
  });

  const selectValueGender = form.watch("genero");
  const selectValueNivel = form.watch("nivel");
  const { errors } = form.formState;

  useEffect(() => {
    if (isEditMode && developer) {
      form.setValue("nome", developer.nome);
      form.setValue("genero", developer.sexo);
      form.setValue("dob", new Date(developer.data_nascimento));
      form.setValue("hobby", developer.hobby);
      form.setValue("nivel", developer.nivel.id.toString());
    }
  }, [isEditMode, developer, form]);

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

  const { mutateAsync: createDevsFn } = useMutation({
    mutationFn: useCreateDevs.fn,
    onSuccess: () => {
      form.reset();
      setIsOpen(false);
      toast({
        title: "Desenvolvedor cadastrado com sucesso!",
      });
      queryClient.invalidateQueries({queryKey: ["useDevsPaginationKey"]});
    },
    onError: () => {
      toast({
        title: "Erro ao cadastrar desenvolvedor",
        variant: "destructive",
      });
    },
  });

  const { mutateAsync: updateDevsFn } = useMutation({
    mutationFn: useUpdateDevs.fn,
    onSuccess: () => {
      form.reset();
      setIsOpen(false);
      toast({
        title: "Desenvolvedor atualizado com sucesso!",
      });
      queryClient.invalidateQueries({queryKey: ["useDevsPaginationKey"]});
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar desenvolvedor",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (values: FormDataType) => {
    const payload = {
      nivel_id: Number(values.nivel),
      nome: values.nome,
      sexo: values.genero,
      data_nascimento: format(new Date(values.dob), "PPP",{
        locale: ptBR,
      }),
      hobby: values.hobby,
    };

    if (isEditMode && developer) {
      await updateDevsFn({
        id: developer.id,
        ...payload,
      });
    } else {
      await createDevsFn(payload);
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
            {isEditMode ? "Editar desenvolvedor" : "Cadastrar desenvolvedor"}
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para {isEditMode ? "editar" : "cadastrar"}{" "}
            um desenvolvedor.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="createDevelopForm"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genero"
              render={({ field }) => (
                <FormItem>
                  <Select
                    field={field}
                    form={form}
                    error={!selectValueGender && errors.genero}
                    data={generos.map((genero) => ({
                      value: genero.value.toString() || "",
                      label: genero.label || "",
                    }))}
                    label="Gênero"
                    selectText="Escolha o gênero"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de nascimento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={clsx(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP",{
                              locale: ptBR,
                            })
                          ) : (
                            <span>Selecione a data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    A data de nascimento é usada para calcular a idade.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hobby"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hobby</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o hobby..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nivel"
              render={({ field }) => (
                <FormItem>
                  <Select
                    field={field}
                    form={form}
                    error={!selectValueNivel && errors.nivel}
                    data={niveis?.map((nivel: Niveis) => ({
                      value: nivel.id.toString() || "",
                      label: nivel.nivel || "",
                    }))}
                    label="Nível"
                    selectText="Escolha o nível"
                  />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form="createDevelopForm" type="submit">
            {isEditMode ? "Salvar alterações" : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
