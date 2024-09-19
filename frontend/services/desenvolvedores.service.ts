import { useQuery } from "@tanstack/react-query";
import Axios from "./api";
import { Devs } from "@/app/(page)/desenvolvedores/columns";

export interface Params {
  nome: string;
  sexo: string;
  hobby: string;
  data_nascimento: string;
  nivel_id: number;
}

export const useDevsPagination = (page: number) => {
  return useQuery({
    queryKey: ["useDevsPaginationKey", page],
    queryFn: async () => {
      const response = await Axios.get(`/api/desenvolvedores/paginate?page=${page}`);
      return response.data;
    },
  });
}

export const useDevsGetAll = () => {
  return useQuery({
    queryKey: ["useDevsGetAllKey"],
    queryFn: async () => {
      const response = await Axios.get("/api/desenvolvedores");
      return response.data;
    },
  });
};

export const useCreateDevs = {
  fn: async (createParams: Params) => {
    try {
      const response = await Axios.post("/api/desenvolvedores", {
        ...createParams,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  key: "postCreateDesenvolvedoresKey",
};

export const useUpdateDevs = {
  fn: async (updateParams:{ id: number} & Params) => {
    try {
      const response = await Axios.put(`/api/desenvolvedores/${updateParams.id}`, {
        ...updateParams,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  key: "useUpdateDevsKey",
};

export const useDeleteDevs = {
  fn: async (id: number) => {
    try {
      const response = await Axios.delete(`/api/desenvolvedores/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  key: "useDeleteDevsKey",
};

