import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSale = () => {
    const axiosSecure= useAxiosSecure();
    const {user}= useAuth();
    console.log(user?.email);
    const {data: userSalesData=[], isPending: salesLoading}= useQuery({
        queryKey: ['userSalesData', user?.email],
        queryFn: async()=>{
            const res= await axiosSecure.get(`/sales/${user.email}`);
            return res.data;
        }
    })
    return [userSalesData,salesLoading];
};

export default useSale;