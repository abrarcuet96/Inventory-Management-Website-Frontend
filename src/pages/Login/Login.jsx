import { FaArrowLeft, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const Login = () => {
    const highlightText = {
        background: 'linear-gradient(to bottom, transparent 50%, #EA580C 50%)'
    }
    const { signIn, googleSignIn, loading, setLoading } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    imageURL: res.user.photoURL,
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
                axiosSecure.get(`/users/${res.user.email}`)
                    .then(res => {
                        console.log(res.data[0]);
                        const isManager = res.data[0]?.role === 'manager';
                        const isAdmin = res.data[0]?.role === 'admin';
                        if (isManager) { navigate('/dashboard/managerHome') }
                        else if (isAdmin) { navigate('/dashboard/adminHome') }
                        else { navigate('/createStore') }
                    })

            })
            .catch(err => {
                console.log(err);
                toast.error(err.message);
                setLoading(false);
            })
    }
    const handleLogin = e => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(res => {
                console.log(res.user);
                setLoading(false);
                if (res.user) {
                    Swal.fire({
                        icon: "success",
                        title: "You are successfully logged in",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    axiosSecure.get(`/users/${res.user.email}`)
                        .then(res => {
                            console.log(res.data[0]);
                            const isManager = res.data[0]?.role === 'manager';
                            const isAdmin = res.data[0]?.role === 'admin';
                            if (isManager) { navigate('/dashboard/managerHome') }
                            else if (isAdmin) { navigate('/dashboard/adminHome') }
                            else { navigate('/createStore') }
                        })
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Please verify your email!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Please give valid email and password!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(false);
            })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-[conic-gradient(var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900" >
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left w-1/2">
                        <h1 className="text-5xl font-bold text-blue-100">Unlock Your Inventory Insights <br />- <span className="text-white font-bold" style={highlightText}>Log in Here!</span></h1>
                        <p className="py-6 text-xl text-white font-semibold">This tagline suggests that logging in grants users access to valuable insights into their inventory, encouraging them to do so for a better understanding.</p>
                        <Link to="/">
                            <div className="flex justify-center items-center gap-2 text-white hover:text-blue-300">
                                <div><FaArrowLeft /></div>
                                <h2 className="text-lg font-semibold hover:text-blue-300 hover:border-b-4 hover:border-blue-300">Home</h2>
                            </div>
                        </Link>
                    </div>

                    <div className="card shrink-0 w-1/2 max-w-sm  backdrop-blur-sm bg-white/30 rounded-none">
                        <form onSubmit={handleLogin} className="card-body">
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
                            <div className="form-control mt-3">
                                <button className="btn btn-primary bg-blue-800 text-xl">
                                    {
                                        loading ? <ImSpinner9 className="animate-spin" /> : <p>Login</p>
                                    }
                                </button>
                            </div>
                            <div className="text-center flex items-center bg-slate-300 rounded-lg p-2 mt-3">
                                <p className="font-semibold">or, Login with google</p>
                                <button onClick={handleGoogleSignIn} className="btn"><FaGoogle></FaGoogle></button>
                            </div>
                            <p className="text-center text-lg">Do not have an account? <Link to="/register" className="font-semibold text-white">Register</Link></p>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Login;