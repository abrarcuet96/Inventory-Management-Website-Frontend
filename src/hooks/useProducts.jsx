import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useProducts = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    console.log(user?.email);
    const { data: productData = {}, isPending: productLoading } = useQuery({
        queryKey: ['productData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${user.email}`);
            return res.data;
        }
    })
    return [productData, productLoading];
}
export default useProducts;