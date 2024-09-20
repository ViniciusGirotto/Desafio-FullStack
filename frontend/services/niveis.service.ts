import { useQuery } from '@tanstack/react-query';
import Axios from './api';


export interface Params {
  nivel: string;
}


export const useNiveisPagination = (page: number, search: string) => {
    return useQuery({
      queryKey: ["useNiveisPaginationKey", page, search],
      queryFn: async () => {
        const response = await Axios.get(`/api/niveis/paginate?page=${page}&search=${search}`);
        return response.data;
      },
    });
  }

export const useNiveisGetAll = () => {
    return useQuery({
        queryKey: ["useNiveisGetAllKey"],
        queryFn: async () => {
            const response = await Axios.get("/api/niveis");
            return response.data;
        },
    });
}

export const useCreateNivel = {
  fn: async (createParams: Params) => {
    try {
      const response = await Axios.post("/api/niveis", {
        ...createParams,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  key: "useCreateNivelKey",
};

export const useUpdateNivel = {
  fn: async (updateParams:{ id: number} & Params) => {
    try {
      const response = await Axios.put(`/api/niveis/${updateParams.id}`, {
        ...updateParams,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  key: "useUpdateNivel",
};

export const useDeleteNivel = {
  fn: async (id: number) => {
    try {
      const response = await Axios.delete(`/api/niveis/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  key: "useDeleteNivelKey",
};

