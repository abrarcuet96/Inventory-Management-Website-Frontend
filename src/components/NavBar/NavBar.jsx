import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";

const NavBar = () => {
    const [userData, loading] = useUser();
    console.log(userData[0]);
    const { user, logOut } = useAuth();
    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }
    const navLinks =
        <>
            {
                loading ? <progress className="loading loading-ring loading-lg"></progress> :
                    <>
                        <li className="text-xl font-semibold">
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#32E0C4]" : "text-white"
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="text-xl font-semibold">
                            <NavLink
                                to="/register"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#32E0C4]" : "text-white"
                                }
                            >
                                Register
                            </NavLink>
                        </li>
                        {
                            userData[0]?.role === 'manager' ?
                                <li className="text-xl font-semibold">
                                    <NavLink
                                        to="dashboard/managerHome"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-[#32E0C4]" : "text-white"
                                        }
                                    >
                                        Dashboard
                                    </NavLink>
                                </li> : <li className="text-xl font-semibold">
                                    <NavLink
                                        to="/createStore"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-[#32E0C4]" : "text-white"
                                        }
                                    >
                                        Create_Store
                                    </NavLink>
                                </li>
                        }
                        <li className="text-xl font-semibold">
                            <NavLink
                                to="/watchDemo"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#32E0C4]" : "text-white"
                                }
                            >
                                Watch_Demo
                            </NavLink>
                        </li>
                    </>
            }
        </>
    return (
        <div className="bg-[#353e4b] py-5">
            <div className="navbar  max-w-screen-2xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="flex justify-center items-center">
                        <div>
                            <img className="w-[50px] max-lg:hidden" src="box_3972677.png" alt="" />
                        </div>
                        <div>
                            <h2 className="btn btn-ghost text-5xl font-bold text-white">InvigoNex</h2>
                        </div>
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <>
                                <div className="flex flex-row justify-center items-center">
                                    <div className=" mr-2 p-1 rounded-lg max-sm:hidden  w-full">
                                        <span className="text-[#32E0C4] text-xl font-semibold">{user?.displayName}</span>

                                    </div>
                                    <img className="w-8 h-8 mr-2 rounded-full border-2 border-[#32E0C4]" src={user?.photoURL} alt="" />
                                    <Link to="/">
                                        <button onClick={handleLogOut}><Link className="text-xl font-semibold text-[#32E0C4] hover:border-b-4 hover:border-[#32E0C4]" to="/">LogOut</Link></button>
                                    </Link>
                                </div>
                            </> : <Link to="/login" className="text-xl font-semibold text-[#32E0C4] hover:border-b-4 hover:border-[#32E0C4]">Login</Link>
                    }

                </div>
            </div>
        </div>

    );
};

export default NavBar;