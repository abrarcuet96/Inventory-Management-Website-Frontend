
import useShop from "../../hooks/useShop";
const ManageShop = () => {
    const [shop,shopDataLoading]= useShop();
    return (
        <div>
            <div className="my-5">
                <h2 className="text-center text-4xl font-semibold text-blue-800">All shops are listed here</h2>
            </div>
            <div className="overflow-x-auto m-5">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Shop Name</th>
                            <th>Shop Image</th>
                            <th>Product Limit</th>
                            <th>Sale Description</th>
                            <th>Send Notice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            shopDataLoading ? '' :
                                <>
                                    {
                                        shop.map((user, index) => <tr key={user._id}>
                                            <th>
                                                {index + 1}
                                            </th>
                                            <th>
                                                {user.shopName}
                                            </th>
                                            <th>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={user.shopLogo} />
                                                    </div>
                                                </div>
                                            </th>

                                            <th>{user.productLimit}</th>
                                            <th>{user.shopInfo}</th>
                                            <th><button className="btn btn-ghost btn-md">Send</button></th>
                                        </tr>)
                                    }
                                </>
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageShop;