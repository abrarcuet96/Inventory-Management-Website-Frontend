import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

const MainLayout = () => {
    return (
        <div className=" bg-gradient-to-t from-gray-700 via-gray-900 to-black">
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;