import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllPurchase = () => {
    const axiosSecure= useAxiosSecure();
    const {data: userAllPurchaseData=[], isPending: allPurchaseLoading}= useQuery({
        queryKey: ['userPurchaseData'],
        queryFn: async()=>{
            const res= await axiosSecure.get(`/purchase`);
            return res.data;
        }
    })
    return [userAllPurchaseData,allPurchaseLoading];
};

export default useAllPurchase;