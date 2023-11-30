import useProducts from "../../hooks/useProducts";
import { FcViewDetails } from "react-icons/fc";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const ProductsSection = () => {
    const [productData, productLoading, refetch] = useProducts();
    const axiosSecure = useAxiosSecure();
    const handleDeleteProduct = (product) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${product._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <div>
            <Helmet>
                <title>InvigoNex | Products Section</title>
            </Helmet>
            <div className="my-5">
                <h2 className="text-center text-4xl font-semibold text-blue-800">Your all added products are listed here</h2>
            </div>
            <div className="overflow-x-auto m-5">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Product Quantity</th>
                            <th>Sale Count</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            productLoading ? '' :
                                <>
                                    {
                                        productData.map((product, index) => <tr key={product._id}>
                                            <th>
                                                {index + 1}
                                            </th>
                                            <th>
                                                {product.productName}
                                            </th>
                                            <th>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={product.productImage} />
                                                    </div>
                                                </div>
                                            </th>

                                            <th>{product.productionQuantity}</th>
                                            <th>
                                                <button className="btn btn-ghost btn-xs">{product.saleCount}</button>
                                            </th>
                                            <th><Link to={`/dashboard/updateProductDetails/${product.userEmail}/${product._id}`}><button className="btn btn-ghost btn-md"><FcViewDetails className="text-4xl" /></button></Link></th>
                                            <th><button onClick={() => handleDeleteProduct(product)} className="btn btn-ghost btn-md"><MdOutlineDeleteForever className="text-4xl text-red-800" /></button></th>
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

export default ProductsSection;