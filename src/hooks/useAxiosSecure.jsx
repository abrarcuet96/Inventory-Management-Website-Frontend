import axios from "axios";

const axiosSecure= axios.create({
    baseURL:'https://inventory-management-system-backend-1pzhvx20o.vercel.app'
})
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;