import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [adminData, adminLoading] = useAdmin();
    const location = useLocation();
    if (loading || adminLoading) {
        return <div className="flex text-center justify-center items-center">
            <progress className="progress w-56"></progress>
        </div>
    }
    if (user && adminData) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;