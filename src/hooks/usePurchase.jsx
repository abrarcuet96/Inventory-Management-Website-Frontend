import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePurchase = () => {
    const axiosSecure= useAxiosSecure();
    const {user}= useAuth();
    console.log(user?.email);
    const {data: userPurchaseData=[], isPending: purchaseLoading}= useQuery({
        queryKey: ['userPurchaseData', user?.email],
        queryFn: async()=>{
            const res= await axiosSecure.get(`/purchase/${user.email}`);
            return res.data;
        }
    })
    return [userPurchaseData,purchaseLoading];
};

export default usePurchase;