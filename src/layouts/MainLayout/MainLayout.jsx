import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer2 from "../../components/Footer/Footer2";

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer2></Footer2>
        </div>
    );
};

export default MainLayout;