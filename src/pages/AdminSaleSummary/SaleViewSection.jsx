import useAdmin from "../../hooks/useAdmin";
import useAllProducts from "../../hooks/useAllProducts";
import useAllSales from "../../hooks/useAllSales";

const SaleViewSection = () => {
    const [adminData, adminLoading] = useAdmin();
    console.log(adminData);
    const [allProducts] = useAllProducts();
    console.log(allProducts);
    const [allSales] = useAllSales();
    console.log(allSales);
    return (
        <div className="flex justify-center my-5">
            {
                adminLoading ? <span className="loading loading-bars loading-lg"></span> :
                    <div className="stats shadow">

                        <div className="stat place-items-center">
                            <div className="stat-title text-xl text-blue-800 font-semibold">Total Income</div>
                            <div className="stat-value">{adminData[0].income} $</div>
                        </div>

                        <div className="stat place-items-center">
                            <div className="stat-title text-xl text-blue-800 font-semibold">Total Product</div>
                            <div className="stat-value">{allProducts.length}</div>
                        </div>

                        <div className="stat place-items-center">
                            <div className="stat-title text-xl text-blue-800 font-semibold">Total Sales</div>
                            <div className="stat-value text-secondary">{allSales.length}</div>
                        </div>

                    </div>
            }
        </div>
    );
};

export default SaleViewSection;