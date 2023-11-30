import { useEffect, useState } from "react";
import useSale from "../../hooks/useSale";
import SalesTable from "./SalesTable";
import _ from "lodash";
const SalesHistory = () => {
    const pageSize = 10;
    const [userSalesData] = useSale();
    const [pageContent, setPageContent] = useState();
    const [currPage, setCurrPage] = useState(1);
    console.log(userSalesData);
    userSalesData.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
    useEffect(() => {
        setPageContent(_(userSalesData).slice(0).take(pageSize).value());
    }, [userSalesData]);

    const pageCount = userSalesData ? Math.ceil(userSalesData.length / pageSize) : 0;
    console.log(pageCount);
    if (pageCount === 1) { return null; }
    const pages = _.range(1, pageCount + 1);
    console.log(pages);
    const pagination = (pageNo) => {
        setCurrPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedContent = _(userSalesData).slice(startIndex).take(pageSize).value();
        setPageContent(paginatedContent);
    }
    return (
        <div className="mx-5">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Selling Date</th>
                            <th>Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            pageContent?.map((item, index) =>
                                <SalesTable key={item._id} index={index} item={item}></SalesTable>)
                        }

                    </tbody>
                </table>
                <div className="flex justify-center my-5">
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm justify-center" aria-label="Pagination">
                        {
                            pages.map(page =>
                                <a key={page} href="#" aria-current="page" className={
                                    page === currPage ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                }>
                                    <p onClick={() => pagination(page)}>{page}</p>
                                </a>
                            )
                        }
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default SalesHistory;