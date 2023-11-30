import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SectionContainer from "../Container/SectionContainer";
const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const RegistrationSection = () => {
    const { createUser, updateUserProfile, loading, setLoading } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [uploadButton, setUploadButton] = useState('Upload Image');
    const handleImageText = image => {
        setUploadButton(image.name);
    }
    const handleRegister = async e => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const { data } = await axios.post(image_hosting_api, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(data);
        console.log(name, email, password, data.data.display_url);
        if (password.length < 6) {
            toast.error('Password should be at least 6 characters or long');
            setLoading(false);
            return;
        }
        else if (!/^(?=.*[A-Z]).+$/.test(password)) {
            toast.error('Your password should have at least one upper case character');
            setLoading(false);
            return;
        }
        else if (!/^(?=.*[\W_]).+$/.test(password)) {
            toast.error('Your password should have at least one special character');
            setLoading(false);
            return;
        }
        createUser(email, password)
            .then(res => {
                console.log(res.user);
                updateUserProfile(name, data.data.display_url)
                    .then(() => {
                        // send user info to database
                        const userInfo = {
                            name: name,
                            email: email,
                            imageURL: data.data.display_url,
                            role: 'No Role',
                            shopName: 'No Shop Name',
                            shopLogo: 'No Shop Logo',
                            income: ''

                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    setLoading(false);

                                }
                            })
                        navigate('/createStore');
                    })


            })
            .catch(err => {
                console.log(err);
                toast.error(err.message);
                setLoading(false);
            })
    }

    return (
        <SectionContainer>
            <div className="hero min-h-screen my-12" style={{ backgroundImage: 'url(https://i.ibb.co/WKNvcTY/Inventory.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="hero min-h-screen">
                        <div className="hero-content flex-col lg:flex-row-reverse">
                            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-slate-300 rounded-none">
                                <h2 className="text-4xl text-center text-black font-semibold my-5">Please Register!!</h2>
                                <form onSubmit={handleRegister} className="card-body">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                    </div>
                                    <div className=' p-2 bg-white w-full  mt-5 rounded-lg'>
                                        <div className='file_upload px-3 py-2 relative border-4 border-dotted border-gray-300 rounded-lg'>
                                            <div className='flex flex-col  text-center'>
                                                <label>
                                                    <input
                                                        onChange={e => handleImageText(e.target.files[0])}
                                                        className='text-sm cursor-pointer w-36 hidden'
                                                        type='file'
                                                        name='image'
                                                        id='image'
                                                        accept='image/*'
                                                        hidden
                                                    />
                                                    <div className='btn btn-primary bg-blue-800 text-white border border-gray-300 font-semibold cursor-pointer p-1 px-3 w-full rounded-lg'>
                                                        {uploadButton}
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-control mt-5">
                                        <button className="btn btn-primary bg-blue-800 text-xl">
                                            {
                                                loading ? <ImSpinner9 className="animate-spin" /> : <p>Register</p>
                                            }
                                        </button>

                                    </div>
                                    <p className="text-center text-xl text-black">Already have an account? <Link to="/login" className="font-semibold text-black">Login</Link></p>
                                </form>
                            </div>
                            <div className="text-center lg:text-left bg-slate-800 bg-opacity-50 p-5 rounded-lg">
                                <h1 className="text-5xl font-bold text-center">Our Goal</h1>
                                <p className="py-6 text-justify">
                                    Our goal is to provide businesses with a comprehensive and easy-to-use solution for managing their stock levels, streamlining their inventory processes, and gaining valuable insights into their inventory data. The website should offer a range of features, including real-time inventory tracking, stock replenishment automation, order processing integration, and comprehensive reporting capabilities. By providing these features, the website should help businesses improve inventory accuracy, reduce costs, increase efficiency, and make informed decisions that drive business growth.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster></Toaster>
        </SectionContainer>
    );
};

export default RegistrationSection;