import { Helmet } from "react-helmet-async";
import SalesCount from "./SalesCount";
import SalesHistory from "./SalesHistory";

const SaleSummary = () => {
    return (
        <div>
            <Helmet>
                <title>InvigoNex | Sale Summary</title>
            </Helmet>
            <SalesCount></SalesCount>
            <SalesHistory></SalesHistory>
        </div>
    );
};

export default SaleSummary;