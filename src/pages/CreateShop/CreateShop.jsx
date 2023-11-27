import { useForm } from "react-hook-form";
import SectionContainer from "../../components/Container/SectionContainer";
import { FaShop } from "react-icons/fa6";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const CreateShop = () => {
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
            }
            const shopInfoToDB = await axiosSecure.post(`/shops/${user.email}`, shopInfo);
            console.log(shopInfoToDB.data);
            if (shopInfoToDB.data.insertedId) {
                reset();
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    imageURL: res.data.data.display_url,
                    role: 'manager',
                    shopName: data.shopName,
                    shopLogo: res.data.data.display_url,
                }
                const updateUserInfo = await axiosPublic.patch(`/users`, userInfo);
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
                        <button className="btn btn-primary bg-blue-800 text-white  font-semibold cursor-pointer p-1 px-3 w-1/2 rounded-lg text-xl">Create Shop <FaShop className="" /></button>
                    </div>
                </form>
            </div>
        </SectionContainer>
    );
};

export default CreateShop;