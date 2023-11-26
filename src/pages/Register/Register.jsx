import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
const Register = () => {
    const { createUser, updateUserProfile, loading, setLoading} = useAuth();
    const navigate= useNavigate();
    const highlightText = {
        background: 'linear-gradient(to bottom, transparent 50%, #EA580C 50%)'
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
        const {data}= await axios.post(`https://api.imgbb.com/1/upload?key=409d63a85c8999929d0d38334663991f`,formData);
        // console.log(data);
        console.log(name, email, password, data.data.display_url);
        if (password.length < 6) {
            toast.error('Password should be at least 6 characters or long');
            return;
        }
        else if (!/^(?=.*[A-Z]).+$/.test(password)) {
            toast.error('Your password should have at least one upper case character');
            return;
        }
        else if (!/^(?=.*[\W_]).+$/.test(password)) {
            toast.error('Your password should have at least one special character');
            return;
        }
        createUser(email, password)
            .then(res => {
                console.log(res.user);
                updateUserProfile(name, data.data.display_url);
                toast.success('User Created Successfully');
                setLoading(false);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message);
            })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left w-1/2">
                        <h1 className="text-5xl font-bold text-white">Optimize, Organize, and Own Your Inventory <br />– <span className="text-white font-bold" style={highlightText}>Register Today!</span></h1>
                        <p className="py-6 text-xl text-white font-semibold">It emphasizes the optimization and organization benefits that users can gain by using your inventory management system, encouraging them to register for these advantages.</p>
                        <Link to="/">
                            <div className="flex justify-center items-center gap-2 text-white hover:text-blue-300">
                                <div><FaArrowLeft /></div>
                                <h2 className="text-lg font-semibold hover:text-blue-300 hover:border-b-4 hover:border-blue-300">Home</h2>
                            </div>
                        </Link>
                    </div>
                    <div className="card shrink-0 w-1/2 max-w-sm  backdrop-blur-sm bg-white/30 rounded-none">
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
                            <div>
                                <label htmlFor='image' className='block mb-2 text-sm'>
                                    Select Image:
                                </label>
                                <input
                                    required
                                    type='file'
                                    id='image'
                                    name='image'
                                    accept='image/*'
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary bg-blue-800 text-xl">
                                    {
                                        loading ? <ImSpinner9 className="animate-spin"/> : <p>Register</p>
                                    }
                                </button>

                            </div>
                            <p className="text-center text-xl">Already have an account? <Link to="/login" className="font-semibold text-white">Login</Link></p>
                        </form>
                    </div>
                </div>


            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Register;