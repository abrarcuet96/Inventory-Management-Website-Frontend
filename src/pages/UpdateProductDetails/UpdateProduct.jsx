import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import usePurchase from "../../hooks/usePurchase";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateProduct = () => {
    const [userPurchaseData, purchaseLoading] = usePurchase();
    const [userData, loading] = useUser();
    const productItem = useLoaderData();
    console.log(productItem);
    const { _id, productName, productDescription, productLocation, productionCost, productionQuantity, profitMargin, productDiscount } = productItem;
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [maxPurchase, setMaxPurchase] = useState(0);
    const [productLimit, setProductLimit] = useState(0);
    useEffect(() => {
        console.log(userPurchaseData.length);
        if (userPurchaseData.length > 0) {
            const maxPriceObj = purchaseLoading ? '' : userPurchaseData.reduce((maxObj, currentObj) => {
                return currentObj.price > maxObj.price ? currentObj : maxObj;
            }, userPurchaseData[0]);
            console.log(maxPriceObj.price);
            setMaxPurchase(maxPriceObj.price);
            console.log(maxPurchase);
            if (maxPurchase === 10) { setProductLimit(200); console.log(productLimit); }
            else if (maxPurchase === 20) { setProductLimit(450); console.log(productLimit); }
            else if (maxPurchase === 50) { setProductLimit(1500); console.log(productLimit); }
            else { setProductLimit(3) }
            console.log(productLimit);
        } else { setProductLimit(3); console.log(productLimit); }
    }, [userPurchaseData, purchaseLoading, maxPurchase, productLimit])
    const onSubmit = async (data) => {
        console.log(data);
        const productImageFile = { image: data.productImage[0] };
        const res = await axiosPublic.post(image_hosting_api, productImageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data.success);
        if (res.data.success) {
            const sellingPrice = parseInt(data.productionCost) + (parseInt(data.productionCost) * parseInt(data.profitMargin)) / 100;
            const totalTax = (sellingPrice * 7.5) / 100;
            const totalSellingPrice = sellingPrice + totalTax;
            const productInfo = {
                productName: data.productName,
                productImage: res.data.data.display_url,
                productDescription: data.productDescription,
                productLocation: data.productLocation,
                productionCost: data.productionCost,
                productionQuantity: data.productQuantity,
                profitMargin: data.profitMargin,
                productDiscount: data.productDiscount,
                productAddedDate: new Date(),
                shopName: userData[0].shopName,
                userEmail: userData[0].email,
                sellingPrice: (totalSellingPrice).toFixed(0),
                saleCount: 0,
                productLimit: productLimit

            }
            console.log(productInfo);
            const productInfoToDB = await axiosSecure.patch(`/products/${_id}`, productInfo);
            console.log(productInfoToDB.data);
            if (productInfoToDB.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    icon: "success",
                    title: `Congratulations! Your product is up to date`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/productsSection');
            }
        }
    }
    return (
        <div>
            <Helmet>
                <title>InvigoNex | Update Product</title>
            </Helmet>
            {
                loading ? '' : <div>
                    <h1 className="text-2xl text-center my-4 font-bold text-blue-800">Add Product Here!!</h1>
                    <div className="p-2 bg-base-300 m-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex gap-2 flex-col md:flex-row">
                                {/* product name */}
                                <div className="form-control w-full my-2 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold text-blue-800">Product Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={productName}
                                        placeholder="write your product name here"
                                        {...register("productName", { required: true })}
                                        className="input input-bordered w-full" />
                                </div>
                                {/* product image */}
                                <div className="form-control w-full my-2 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold text-blue-800">Product Image</span>
                                    </label>
                                    <input
                                        type="file"
                                        placeholder="choose your product image here"
                                        {...register("productImage", { required: true })}
                                        className="file-input input-bordered w-full" />
                                </div>
                            </div>
                            {/* shop information */}
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold text-blue-800">Product Description</span>
                                </label>
                                <textarea
                                    type="text"
                                    defaultValue={productDescription}
                                    placeholder="write your product description here"
                                    {...register("productDescription", { required: true })}
                                    className="input input-bordered w-full">
                                </textarea>
                            </div>
                            {/* shop location */}
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text text-xl font-semibold text-blue-800">Product Location</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={productLocation}
                                    placeholder="write your product location here"
                                    {...register("productLocation", { required: true })}
                                    className="input input-bordered w-full" />
                            </div>
                            <div className="flex gap-2 flex-col md:flex-row">
                                {/* shop owner email */}
                                <div className="form-control w-full my-2 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold text-blue-800">Buying Price</span>
                                    </label>
                                    <input
                                        type="number"
                                        defaultValue={productionCost}
                                        placeholder="write your product cost here"
                                        {...register("productionCost", { required: true })}
                                        className="input input-bordered w-full"
                                        min={0} />
                                </div>
                                {/* shop owner name */}
                                <div className="form-control w-full my-2 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold text-blue-800">Product Quantity</span>
                                    </label>
                                    <input
                                        type="number"
                                        defaultValue={productionQuantity}
                                        placeholder="give your product quantity here"
                                        {...register("productQuantity", { required: true })}
                                        className="input input-bordered w-full"
                                        min={0} />
                                </div>
                            </div>
                            <div className="flex gap-2 flex-col md:flex-row">
                                {/* shop owner email */}
                                <div className="form-control w-full my-2 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold text-blue-800">Profit Margin(%)</span>
                                    </label>
                                    <input
                                        type="number"
                                        defaultValue={profitMargin}
                                        placeholder="write your profit margin here"
                                        {...register("profitMargin", { required: true })}
                                        className="input input-bordered w-full"
                                        min={0} />
                                </div>
                                {/* shop owner name */}
                                <div className="form-control w-full my-2 md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-xl font-semibold text-blue-800">Discount(%)</span>
                                    </label>
                                    <input
                                        type="number"
                                        defaultValue={productDiscount}
                                        placeholder="write available discount here"
                                        {...register("productDiscount", { required: true })}
                                        className="input input-bordered w-full"
                                        min={0} />
                                </div>
                            </div>
                            <div className="flex justify-center my-2">
                                <button className="btn btn-primary bg-blue-800 text-white  font-semibold cursor-pointer p-1 px-3 w-1/2 rounded-lg text-xl">Add Product <IoAddCircleOutline /></button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
};

export default UpdateProduct;