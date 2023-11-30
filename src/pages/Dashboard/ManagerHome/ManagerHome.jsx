import { Link } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import useProducts from "../../../hooks/useProducts";

const ManagerHome = () => {
    const [userData, loading] = useUser();
    console.log(userData);
    const [productData, productLoading] = useProducts();
    console.log(productData);
    return (
        <div>
            {
                loading || productLoading ? '' : <>
                    <div className="flex justify-between m-2 items-center border-b-4 border-t-4 p-2">
                        <h2 className="text-xl font-semibold">Total {productData.length} Products Added</h2>
                        <Link to="/dashboard/addProduct"><button className="btn text-xl">Add Product</button></Link>
                    </div>
                    <div className="flex flex-col justify-center items-center min-h-[80vh]">
                        <div className="flex flex-col justify-center items-center">
                            <img className="w-[200px] mb-2 rounded-full" src={userData[0].imageURL} alt="" />
                            <h2 className="text-4xl mb-2 font-semibold">{userData[0].name}</h2>
                            <h2 className="text-6xl font-bold">{userData[0].shopName}</h2>
                            <h2 className="text-6xl font-bold text-blue-800">Manager</h2>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default ManagerHome;