
const WatchDemo = () => {
    return (

        <div className="bg-[#222831]">
            <div className="flex max-w-screen-2xl mx-auto min-h-[80vh] justify-center items-center gap-5 ">
            <div className="w-1/2 flex items-center">
                <div>
                    <p className="text-6xl text-white font-bold my-9">Welcome to <br /> <span className="text-7xl text-[#32E0C4]">InvigoNex</span><br />  Demo Video Page</p>
                    <p className="text-2xl text-white mb-9">Welcome to InvigoNex! Explore the efficiency and effectiveness of our inventory management solution through our demo videos. Whether you are a small business owner, warehouse manager, or logistics professional, our demo videos offer a comprehensive view of how our platform can streamline your inventory processes and boost productivity.

                    </p>

                </div>
            </div>
            <div className="ratio ratio-16x9 w-1/2">
                <iframe className="" width="700" height="500" src="https://www.youtube.com/embed/xNRJwmlRBNU?si=6lfcbdEgIAjKzCyy" title="YouTube video player" allowfullscreen>
                </iframe>
            </div>
        </div>
        </div>
    );
};

export default WatchDemo;