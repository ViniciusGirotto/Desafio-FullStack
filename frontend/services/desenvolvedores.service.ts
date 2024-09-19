import { useQuery } from '@tanstack/react-query';
import Axios from './api';


export const useDesenvolvedoresGetAll = () => {
    return useQuery({
        queryKey: ["useDesenvolvedoresGetAllKey"],
        queryFn: async () => {
            const response = await Axios.get("/api/desenvolvedores");
            return response.data;
        }
    });
}