import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { data: adminData = {}, isPending: adminLoading, refetch } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/admin`);
            return res.data;
        }
    })
    return [adminData, adminLoading, refetch];
};

export default useAdmin;