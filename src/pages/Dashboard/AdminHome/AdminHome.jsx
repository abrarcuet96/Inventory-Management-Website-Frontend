
import { Helmet } from "react-helmet-async";
import useUser from "../../../hooks/useUser";

const AdminHome = () => {
    const [userData, loading] = useUser();
    return (
        <div>
            <Helmet>
                <title>InvigoNex | Admin Home</title>
            </Helmet>
            {
                loading  ? '' : <>
                    <div className="flex flex-col justify-center items-center min-h-[100vh]">
                        <div className="flex flex-col justify-center items-center">
                            <img className="w-[200px] mb-2 rounded-full" src={userData[0].imageURL} alt="" />
                            <h2 className="text-4xl mb-2 font-semibold">{userData[0].name}</h2>
                            <h2 className="text-6xl font-bold text-blue-800">Admin</h2>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default AdminHome;