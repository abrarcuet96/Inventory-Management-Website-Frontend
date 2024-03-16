import { useForm } from "react-hook-form";
import { FaShop } from "react-icons/fa6";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import usePurchase from "../../hooks/usePurchase";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const CreateShop = () => {
    const [userPurchaseData, purchaseLoading] = usePurchase();
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
    const { user } = useAuth();
    console.log(user);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data);
        const shopLogoFile = { image: data.shopLogo[0] };
        const res = await axiosPublic.post(image_hosting_api, shopLogoFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res.data.success);
        if (res.data.success) {
            const shopInfo = {
                shopName: data.shopName,
                shopLogo: res.data.data.display_url,
                shopInfo: data.shopInfo,
                shopLocation: data.shopLocation,
                ownerEmail: data.ownerEmail,
                ownerName: data.ownerName,
                productLimit: productLimit
            }
            console.log(shopInfo);
            const shopInfoToDB = await axiosSecure.post(`/shops/${user.email}`, shopInfo);
            console.log(shopInfoToDB.data);
            if (shopInfoToDB.data.insertedId) {
                reset();
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    imageURL: user.photoURL,
                    role: 'manager',
                    shopName: data.shopName,
                    shopLogo: res.data.data.display_url,
                    income: ''
                }
                const updateUserInfo = await axiosSecure.patch(`/users`, userInfo);
                console.log(updateUserInfo.data);
                if (updateUserInfo.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: `Congratulations ${shopInfo.ownerName}! Your shop is created. Your have become shop Manager`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
            else {
                reset();
                Swal.fire({
                    icon: "error",
                    title: "Sorry,You cannot create a shop",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        }
    }
    return (
        <div className="max-w-screen-2xl mx-auto">
            <Helmet>
                <title>InvigoNex | Create Shop</title>
            </Helmet>
            {/* <h1 className="text-4xl text-center my-4 font-semibold text-blue-800">Create Your Store Here!!</h1> */}
            <div className="flex">
                <div className="w-1/2">
                    <img className="w-full" src="gif2.gif" alt="" />
                </div>
                <div className="w-1/2 p-2">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* shop name */}
                        <div className="form-control w-full my-2">
                            <label className="label">
                                <span className="label-text text-xl font-bold text-[#222831]">Shop Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Write your shop name here..."
                                {...register("shopName", { required: true })}
                                className="input border-b-4 border-b-[#222831] w-full" />
                        </div>
                        {/* shop logo */}
                        <div className="form-control w-full my-5">
                            <label className="label">
                                <span className="label-text text-xl font-bold text-[#222831]">Shop Logo</span>
                            </label>
                            <input
                                type="file"
                                placeholder="Choose your shop logo..."
                                {...register("shopLogo", { required: true })}
                                className="file-input border-b-4 border-[#222831] w-full" />
                        </div>

                        {/* shop information */}
                        <div className="form-control w-full my-5">
                            <label className="label">
                                <span className="label-text text-xl font-bold text-[#222831]">Shop Information</span>
                            </label>
                            <textarea
                                type="text"
                                placeholder="Write your shop information here..."
                                {...register("shopInfo", { required: true })}
                                className="input border-b-4 border-b-[#222831] w-full">
                            </textarea>
                        </div>
                        {/* shop location */}
                        <div className="form-control w-full my-5">
                            <label className="label">
                                <span className="label-text text-xl font-bold text-[#222831]">Shop Location</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Write your shop location here..."
                                {...register("shopLocation", { required: true })}
                                className="input border-b-4 border-b-[#222831] w-full"/>
                        </div>
                        {/* shop owner email */}
                        <div className="form-control w-full my-5">
                            <label className="label">
                                <span className="label-text text-xl font-bold text-[#222831]">Shop Owner Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Write your email here..."
                                {...register("ownerEmail", { required: true })}
                                className="input border-b-4 border-b-[#222831] w-full" />
                        </div>
                        {/* shop owner name */}
                        <div className="form-control w-full my-5">
                            <label className="label">
                                <span className="label-text text-xl font-bold text-[#222831]">Shop Owner Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Write your name here..."
                                {...register("ownerName", { required: true })}
                                className="input border-b-4 border-b-[#222831] w-full" />
                        </div>
                        <div className="flex justify-center my-5">

                            <button className="btn hover:bg-[#32E0C4] bg-[#5be2cc] text-[#222831]  font-semibold cursor-pointer p-1 px-3 rounded-lg text-lg">Create Shop <FaShop className="" /></button>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default CreateShop;