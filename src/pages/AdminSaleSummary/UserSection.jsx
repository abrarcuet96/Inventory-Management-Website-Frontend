import { useEffect, useState } from "react";
import _ from "lodash";
import useAllUsers from "../../hooks/useAllUsers";
import DataTable from "./DataTable";
const UserSection = () => {
    const pageSize = 10;
    const [allUsers] = useAllUsers();
    console.log(allUsers);
    const [pageContent, setPageContent] = useState();
    const [currPage, setCurrPage] = useState(1);
    // pagination:
    useEffect(() => {
        setPageContent(_(allUsers).slice(0).take(pageSize).value());
    }, [allUsers]);
    const pageCount = allUsers ? Math.ceil(allUsers.length / pageSize) : 0;
    console.log(pageCount);
    // if (pageCount === 1) { return null; }
    const pages = _.range(1, pageCount + 1);
    console.log(pages);
    const pagination = (pageNo) => {
        setCurrPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedContent = _(allUsers).slice(startIndex).take(pageSize).value();
        setPageContent(paginatedContent);
        console.log(pageContent);
    }
    console.log(pageContent);
    return (
        <div className="mx-5">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Shop Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            pageContent?.map((item, index) =>
                                <DataTable key={item._id} index={index} item={item}></DataTable>)
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

export default UserSection;