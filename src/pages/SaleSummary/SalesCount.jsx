import { useEffect, useState } from "react";
import useProducts from "../../hooks/useProducts";

const SalesCount = () => {
    const [productData, productLoading] = useProducts();
    const [totalSale, setTotalSale] = useState();
    const [totalInvest, setTotalInvest] = useState();
    const [totalSellingPrice, setTotalSellingPrice] = useState();
    useEffect(() => {
        const totalSale = productLoading ? '' : productData?.reduce((sum, currObj) => {
            return sum + currObj.saleCount;
        }, 0);
        console.log(totalSale);
        setTotalSale(totalSale);
        const totalInvest = productLoading ? '' : productData?.reduce((sum, currObj) => {
            return sum + (parseInt(currObj.productionCost)*parseInt(currObj.productionQuantity));
        }, 0);
        console.log(totalInvest);
        setTotalInvest(totalInvest);
        const totalSellingPrice = productLoading ? '' : productData?.reduce((sum, currObj) => {
            return sum + (parseInt(currObj.sellingPrice)*parseInt(currObj.saleCount));
        }, 0);
        console.log(totalSellingPrice);
        setTotalSellingPrice(totalSellingPrice);
    }, [productData, productLoading]);
    const totalProfit = (totalSellingPrice - totalInvest);
    const tax = totalProfit * (7.5 / 100);
    const actualProfit = totalProfit - tax;
    return (
        <div className="flex justify-center my-5">
            <div className="stats shadow">

                <div className="stat place-items-center">
                    <div className="stat-title text-xl text-blue-800 font-semibold">Total Sale</div>
                    <div className="stat-value">{totalSale}</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title text-xl text-blue-800 font-semibold">Total Invest</div>
                    <div className="stat-value">{totalInvest} $</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title text-xl text-blue-800 font-semibold">Total Profit</div>
                    <div className="stat-value text-secondary">{actualProfit} $</div>
                </div>

            </div>
        </div>
    );
};

export default SalesCount;