import useProducts from "../../hooks/useProducts";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SingleProduct from "./SingleProduct";
import { Helmet } from "react-helmet-async";
const AllProducts = () => {
    const [productData, productLoading] = useProducts();
    const [searchedId, setSearchedId] = useState('');
    const [newProduct, setNewProduct] = useState({});
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = (data) => {
        console.log(data.searchId);
        console.log(data);
        setSearchedId(data.searchId);
        const productDataNew = productData.filter(product => product._id === data.searchId);
        console.log(productDataNew[0]);
        setNewProduct(productDataNew[0]);
        reset();
    }
    const handleProductCart = (product) => {
        Swal.fire({
            title: "Are you sure you want to add this to the cart?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Proceed Checkout"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/cart', product)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Product Added! to the cart",
                                text: "Product adding successful",
                                icon: "success"
                            });
                            navigate('/dashboard/checkOutCart');
                        }
                    })

            }
        });
    }
    return (
        <div>
            <Helmet>
                <title>InvigoNex | All Products</title>
            </Helmet>
            <div className="my-5">
                <h2 className="text-center text-4xl font-semibold text-blue-800">Your all added products are listed here</h2>
            </div>
            <div className="flex justify-end m-5">
                <div className="flex justify-center items-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            className="h-full p-2 border-2 rounded-lg mx-2"
                            type="search"
                            {...register("searchId", { required: true })}
                            placeholder="Search with product id" />
                        <button className="btn">Search</button>
                    </form>
                </div>
            </div>
            <div className="overflow-x-auto m-5">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Product Quantity</th>
                            <th>Discount</th>
                            <th>Selling Price</th>
                            <th>Add for Check-out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            productLoading ? '' : searchedId ?
                                <SingleProduct product={newProduct} handleProductCart={handleProductCart}></SingleProduct> :
                                <>
                                    {
                                        productData?.map((product) =>
                                            <SingleProduct key={product._id} product={product} handleProductCart={handleProductCart}></SingleProduct>)
                                    }
                                </>
                        }
                    </tbody>
                </table>
            </div>
            <div className="text-end m-5">
                {
                    searchedId ? <button onClick={() => setSearchedId(false)} className="btn"><IoIosArrowBack className="text-xl" />Back</button> : ''
                }
            </div>
        </div>
    );
};

export default AllProducts;