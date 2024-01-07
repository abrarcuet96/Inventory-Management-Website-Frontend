import axios from "axios";

const axiosPublic= axios.create({
    baseURL: 'https://inventory-management-system-backend-1pzhvx20o.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;