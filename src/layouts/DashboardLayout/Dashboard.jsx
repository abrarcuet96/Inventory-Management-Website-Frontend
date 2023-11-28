import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Dashboard = () => {
    const [userData, loading] = useUser();
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

                    <ul className="menu p-4 w-80 min-h-full bg-base-300 text-base-content">
                        {/* Sidebar content here */}
                        {
                            loading ? '' : <>
                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex flex-col justify-center items-center">
                                        <img className="w-[50px] mb-2 rounded-full" src={userData[0].imageURL} alt="" />
                                        <h2 className="text-xl mb-2 font-semibold">{userData[0].name}</h2>
                                    </div>
                                </div>
                            </>
                        }
                        {<>
                            <li className="font-bold">
                                <NavLink to='/dashboard/managerHome'>Manager Home</NavLink>
                            </li>
                            <li className="font-bold">
                                <NavLink to='/dashboard/addProduct'>Add Product</NavLink>
                            </li>
                            <li className="font-bold">
                                <NavLink to='/dashboard/subscription'>Subscription</NavLink>
                            </li>
                            <li className="font-bold">
                                <NavLink to='/'>Home</NavLink>
                            </li>
                        </>

                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;