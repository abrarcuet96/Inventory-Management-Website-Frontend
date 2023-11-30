import { useForm } from "react-hook-form";
import SectionContainer from "../../components/Container/SectionContainer";
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
        <SectionContainer>
            <Helmet>
                <title>InvigoNex | Create Shop</title>
            </Helmet>
            <h1 className="text-4xl text-center my-4 font-semibold text-blue-800">Create Your Store Here!!</h1>
            <div className="p-2 bg-base-300">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-2 flex-col md:flex-row">
                        {/* shop name */}
                        <div className="form-control w-full my-2 md:w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-semibold text-blue-800">Shop Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="write your shop name here"
                                {...register("shopName", { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        {/* shop logo */}
                        <div className="form-control w-full my-2 md:w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-semibold text-blue-800">Shop Logo</span>
                            </label>
                            <input
                                type="file"
                                placeholder="choose your shop logo here"
                                {...register("shopLogo", { required: true })}
                                className="file-input input-bordered w-full" />
                        </div>
                    </div>
                    {/* shop information */}
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text text-xl font-semibold text-blue-800">Shop Information</span>
                        </label>
                        <textarea
                            type="text"
                            placeholder="write your shop information here"
                            {...register("shopInfo", { required: true })}
                            className="input input-bordered w-full">
                        </textarea>
                    </div>
                    {/* shop location */}
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text text-xl font-semibold text-blue-800">Shop Location</span>
                        </label>
                        <input
                            type="text"
                            placeholder="write your shop location here"
                            {...register("shopLocation", { required: true })}
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-2 flex-col md:flex-row">
                        {/* shop owner email */}
                        <div className="form-control w-full my-2 md:w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-semibold text-blue-800">Shop Owner Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="write your email here"
                                {...register("ownerEmail", { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        {/* shop owner name */}
                        <div className="form-control w-full my-2 md:w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-semibold text-blue-800">Shop Owner Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="write your name here"
                                {...register("ownerName", { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex justify-center my-2">
                        
                            <button className="btn btn-primary bg-blue-800 text-white  font-semibold cursor-pointer p-1 px-3 w-full rounded-lg text-xl">Create Shop <FaShop className="" /></button>
                        
                    </div>
                </form>
            </div>
        </SectionContainer>
    );
};

export default CreateShop;