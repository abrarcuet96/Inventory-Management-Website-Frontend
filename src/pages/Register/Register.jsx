import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
const Register = () => {
    const highlightText={
        background: 'linear-gradient(to bottom, transparent 50%, #EA580C 50%)'
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
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary bg-blue-800 text-xl">Register</button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Register;