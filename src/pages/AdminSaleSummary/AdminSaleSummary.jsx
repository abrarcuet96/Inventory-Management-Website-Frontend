import { Helmet } from "react-helmet-async";
import SaleViewSection from "./SaleViewSection";
import UserSection from "./UserSection";

const AdminSaleSummary = () => {
    return (
        <div>
            <Helmet>
                <title>InvigoNex | Admin Sale Summary</title>
            </Helmet>
            <SaleViewSection></SaleViewSection>
            <UserSection></UserSection>
        </div>
    );
};

export default AdminSaleSummary;