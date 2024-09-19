import { useQuery } from '@tanstack/react-query';
import Axios from './api';


export const useNiveisGetAll = () => {
    return useQuery({
        queryKey: ["useNiveisGetAllKey"],
        queryFn: async () => {
            const response = await Axios.get("/api/niveis");
            return response.data;
        }
    });
}