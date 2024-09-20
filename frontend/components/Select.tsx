"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandList,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type DataObject = {
    value: string;
    label: string;
};

type SelectImcProps = {
    field: any;
    form: any;
    data: DataObject[];
    label: string;
    selectText: string;
    error: any;
};

const Select: React.FC<SelectImcProps> = ({
    field,
    form,
    data,
    label,
    selectText,
    error
}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <FormItem className="flex flex-col">
            <FormLabel className={`${error ? 'text-[#7f291d] text-sm ' : "text-white text-base "}`}>{label}</FormLabel>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                            )}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {field.value
                                ? data?.find((item) => item.value == field.value)?.label
                                : selectText}
                            <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                        <CommandList>
                            <CommandGroup>
                                {data?.map((item) => (
                                    <CommandItem
                                        className="cursor-pointer hover:bg-[#807c7a5d]"
                                        value={item.label || ""}
                                        key={item.value}
                                        onSelect={() => {
                                            form.setValue(field.name, item.value);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                item.value === field.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {item.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {error  && (
                <FormMessage className="text-xs">{error}</FormMessage>
            )}
        </FormItem>
    );
};

export { Select };