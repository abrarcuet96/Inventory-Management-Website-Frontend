const Features = () => {
    const highlightText = {
        background: 'linear-gradient(to bottom, transparent 70%, #32E0C4 30%)'
    }
    return (
        <div className="max-w-screen-2xl mx-auto my-20">
            <div>
                <p className="text-center text-6xl font-semibold mb-10 text-[#222831]"><span style={highlightText} >Our Features</span></p>
                <p className="max-w-screen-xl text-center text-2xl mb-10 mx-auto">Our inventory management system offers <span className=" underline decoration-dashed decoration-[#222831]">real-time tracking</span>, <span className=" underline decoration-dashed decoration-[#222831]">customizable reports</span>, and <span className=" underline decoration-dashed decoration-[#222831]">seamless integration</span>. Enjoy user-friendly interface, scalable solutions, and robust security for efficient business management.</p>
            </div>
            <div className="grid grid-cols-3 gap-5">
                <div className="card w-[500px] h-[300px] bg-[#222831] text-primary-content">
                    <div className="card-body">
                        <div className="flex gap-2 items-center">
                            <h2 style={highlightText} className="card-title text-3xl font-bold my-7 text-white">Real-Time Tracking</h2>
                        </div>
                        <p className="text-xl text-white">Monitor your inventory levels, sales, and restocks in real-time, ensuring accurate insights into your stock at all times.</p>
                    </div>
                </div>
                <div className="card w-[500px] h-[300px] bg-[#222831] text-primary-content">
                    <div className="card-body">
                        <div className="flex gap-2 items-center">
                            <h2 style={highlightText} className="card-title text-3xl font-bold my-7 text-white">User-Friendly Interface</h2>
                        </div>
                        <p className="text-xl text-white">Intuitive and easy-to-use interface designed for seamless navigation and efficient management, reducing the learning curve for users.</p>
                    </div>
                </div>
                <div className="card w-[500px] h-[300px] bg-[#222831] text-primary-content">
                    <div className="card-body">
                        <div className="flex gap-2 items-center">
                            <h2 style={highlightText} className="card-title text-3xl font-bold my-7 text-white">Customizable Reports</h2>
                        </div>
                        <p className="text-xl text-white">Generate customizable reports tailored to your specific needs, providing valuable insights into sales trends, stock movements, and financial data.</p>
                    </div>
                </div>
                <div className="card w-[500px] h-[300px] bg-[#222831] text-primary-content">
                    <div className="card-body">
                        <div className="flex gap-2 items-center">
                            <h2 style={highlightText} className="card-title text-3xl font-bold my-7 text-white">Multi-Platform Access</h2>
                        </div>
                        <p className="text-xl text-white">Access your inventory data anytime, anywhere, from any device with internet connectivity, ensuring flexibility and convenience for users on the go.</p>
                    </div>
                </div>
                <div className="card w-[500px] h-[300px] bg-[#222831] text-primary-content">
                    <div className="card-body">
                        <div className="flex gap-2 items-center">
                            <h2 style={highlightText} className="card-title text-3xl font-bold my-7 text-white">Inventory Optimization</h2>
                        </div>
                        <p className="text-xl text-white">Optimize stock levels with intelligent forecasting and automated replenishment suggestions, minimizing stockouts and excess inventory costs.</p>
                    </div>
                </div>
                <div className="card w-[500px] h-[300px] bg-[#222831] text-primary-content">
                    <div className="card-body">
                        <div className="flex gap-2 items-center">
                            <h2 style={highlightText} className="card-title text-3xl font-bold my-7 text-white">Integration Capabilities</h2>
                        </div>
                        <p className="text-xl text-white">Seamlessly integrate with other business systems such as accounting software, e-commerce platforms, and POS systems for streamlined operations and data synchronization.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Features;