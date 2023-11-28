import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    console.log(user?.email);
    const { data: cartData = {}, isPending: cartLoading, refetch } = useQuery({
        queryKey: ['cartData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart/${user.email}`);
            return res.data;
        }
    })
    return [cartData, cartLoading, refetch];
};

export default useCart;