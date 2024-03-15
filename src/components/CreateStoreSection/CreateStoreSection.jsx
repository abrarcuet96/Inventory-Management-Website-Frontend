import { Link } from "react-router-dom";
import img1 from "../../assets/store_create.jpg"
const CreateStoreSection = () => {
    return (
        <div className="bg-[#222831]">
            <div className="flex max-w-screen-2xl mx-auto  justify-center items-center ">
            <div  className="w-1/2 py-32">
                <p className="text-6xl text-white font-bold my-9"><span className="text-7xl text-[#32E0C4]">Get Started</span> <br /> by Creating a Store</p>
                <p className="text-2xl text-white mb-9">Empower Your Business: Begin Your Journey by Creating Your Store Today!</p>
                <Link to="/createStore"><button className="text-2xl font-semibold text-[#32E0C4] hover:border-b-4 hover:border-[#32E0C4]">Create Store</button></Link>
            </div>
            <div className="w-1/2 py-32">
                <img className="rounded-xl" src={img1} alt="" />
            </div>
            </div>
        </div>
    );
};

export default CreateStoreSection;