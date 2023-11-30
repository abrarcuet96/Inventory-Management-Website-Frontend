import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useOnlyShop = () => {
    const axiosSecure= useAxiosSecure();
    const {user}= useAuth();
    console.log(user?.email);
    const {data: shopData=[], isPending: shopLoading}= useQuery({
        queryKey: ['shopData', user?.email],
        queryFn: async()=>{
            const res= await axiosSecure.get(`/shops/${user.email}`);
            return res.data;
        }
    })
    return [shopData,shopLoading];
};

export default useOnlyShop;