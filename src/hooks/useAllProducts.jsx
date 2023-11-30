import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllProducts = () => {
    const axiosSecure= useAxiosSecure();
    const {data: allProducts=[], isPending: allProductsLoading}=useQuery({
        queryKey: ['allProducts'],
        queryFn: async()=>{
            const res= await axiosSecure.get(`/products`);
            return res.data;
        }
    })
    return [allProducts,allProductsLoading];
};

export default useAllProducts;