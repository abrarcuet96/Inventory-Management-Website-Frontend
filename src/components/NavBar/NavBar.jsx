import { Link, NavLink } from "react-router-dom";
import SectionContainer from "../Container/SectionContainer";
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
                loading ? <progress className="progress w-56"></progress> :
                    <>
                        <li className="text-lg font-semibold">
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-blue-800" : "text-white"
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="text-lg font-semibold">
                            <NavLink
                                to="/register"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-blue-800" : "text-white"
                                }
                            >
                                Register
                            </NavLink>
                        </li>
                        {
                            userData[0]?.role === 'manager' ?
                                <li className="text-lg font-semibold">
                                    <NavLink
                                        to="dashboard/managerHome"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-blue-800" : "text-white"
                                        }
                                    >
                                        Dashboard
                                    </NavLink>
                                </li> : <li className="text-lg font-semibold">
                                    <NavLink
                                        to="/createStore"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-blue-800" : "text-white"
                                        }
                                    >
                                        Create_Store
                                    </NavLink>
                                </li>
                        }
                        <li className="text-lg font-semibold">
                            <NavLink
                                to="/watchDemo"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-blue-800" : "text-white"
                                }
                            >
                                Watch_Demo
                            </NavLink>
                        </li>
                    </>
            }
        </>
    return (
        <SectionContainer>
            <div className="navbar">
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
                            <img className="w-[30px] max-lg:hidden" src="logo.png" alt="" />
                        </div>
                        <div>
                            <h2 className="btn btn-ghost text-2xl font-bold text-blue-800">InvigoNex</h2>
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
                                <div className="flex flex-row">
                                    <div className=" mr-2 p-1 rounded-lg max-sm:hidden  w-full">
                                        <span className="text-blue-800 font-semibold">{user?.displayName}</span>

                                    </div>
                                    <img className="w-8 h-8 mr-2 rounded-full" src={user?.photoURL} alt="" />
                                    <Link to="/">
                                        <button onClick={handleLogOut}><Link className="text-lg font-semibold text-blue-800 hover:border-b-4 hover:border-blue-800" to="/">LogOut</Link></button>
                                    </Link>
                                </div>
                            </> : <Link to="/login" className="text-lg font-semibold text-blue-800 hover:border-b-4 hover:border-blue-800">Login</Link>
                    }

                </div>
            </div>
        </SectionContainer>
    );
};

export default NavBar;