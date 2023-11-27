import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useShop = () => {
    const axiosSecure= useAxiosSecure();
    const {data: shop={}}=useQuery({
        queryKey: ['shop'],
        queryFn: async()=>{
            const res= await axiosSecure.get(`/shops`);
            return res.data;
        }
    })
    return [shop];
};

export default useShop;