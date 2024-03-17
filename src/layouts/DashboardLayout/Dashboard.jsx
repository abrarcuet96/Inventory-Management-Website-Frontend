import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
    const [userData, loading] = useUser();
    console.log(userData);
    const { logOut } = useAuth();
    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>


                    {/* Sidebar content here */}
                    {
                        loading ? <progress className="progress w-56"></progress> :
                            <ul className="menu p-4 w-80 min-h-full bg-[#181818] text-base-content flex justify-between">
                                <div>
                                    <>
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="flex flex-col justify-center items-center">
                                                <img className="w-[50px] mb-2 rounded-full border-2 border-[#32E0C4]" src={userData[0]?.imageURL} alt="" />
                                                <h2 className="text-[#32E0C4] text-xl font-semibold mb-2">{userData[0]?.name}</h2>
                                            </div>
                                        </div>
                                    </>
                                    {
                                        userData[0]?.role === 'admin' ?
                                            <>
                                                <li className="font-bold text-white">
                                                    <NavLink to='/dashboard/adminHome'>Admin Home</NavLink>
                                                </li>
                                                <li className="font-bold text-white">
                                                    <NavLink to='/dashboard/manageShop'>Manage Shop</NavLink>
                                                </li>
                                                <li className="font-bold text-white">
                                                    <NavLink to='/dashboard/adminSaleSummary'>Sale Summary</NavLink>
                                                </li>
                                            </>
                                            :
                                            <>
                                                <li className="font-bold text-white">
                                                    <NavLink to='/dashboard/managerHome'>Manager Home</NavLink>
                                                </li>
                                                <li className="font-bold text-white">
                                                    <NavLink to='/dashboard/addProduct'>Add Product</NavLink>
                                                </li>
                                                <li className="font-bold text-white">
                                                    <NavLink to='/dashboard/subscription'>Subscription</NavLink>
                                                </li>
                                                <li className="font-bold text-white">
                                                    <NavLink to='/dashboard/productsSection'>Products Section</NavLink>
                                                </li>
                                                <li className="font-bold text-white">
                                                    <NavLink to='/dashboard/allProductsSection'>All Products</NavLink>
                                                </li>
                                                <li className="font-bold text-white">
                                                    <NavLink to='/dashboard/checkOutCart'>Check Out</NavLink>
                                                </li>
                                                <li className="font-bold text-white">
                                                    <NavLink to='/dashboard/saleSummary'>Sales Summary</NavLink>
                                                </li>
                                            </>
                                    }
                                </div>
                                <div>
                                    <li className="font-bold text-white">
                                        <NavLink to='/'>Home</NavLink>
                                    </li>
                                    <li className="font-bold text-white">
                                        <NavLink to='/'><button onClick={handleLogOut}>Log Out</button></NavLink>
                                    </li>
                                </div>
                            </ul>
                    }






                </div>
            </div>
        </div>
    );
};

export default Dashboard;