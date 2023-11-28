import useProducts from "../../hooks/useProducts";
import { IoIosArrowBack } from "react-icons/io";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SingleProduct from "./SingleProduct";
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
    const handleProductCart = async (product) => {
        const res = await axiosSecure.post('/cart', product);
        if (res.data.insertedId) {
            Swal.fire({
                icon: "success",
                title: `Congratulations! Your Product is Added to the cart`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/checkOutCart');
        }
    }
    return (
        <div>
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
                                        productData.map((product) =>
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