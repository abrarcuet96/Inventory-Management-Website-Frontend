import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllSales = () => {
    const axiosSecure= useAxiosSecure();
    const {data: allSales=[], isPending: allSalesLoading}=useQuery({
        queryKey: ['allSales'],
        queryFn: async()=>{
            const res= await axiosSecure.get(`/sales`);
            return res.data;
        }
    })
    return [allSales,allSalesLoading];
};

export default useAllSales;