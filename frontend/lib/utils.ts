import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generos = [
  {
    value: "M",
    label: "Masculino",
  },
  {
    value: "F",
    label: "Feminino",
  },
];
