import SectionContainer from "../Container/SectionContainer";

const Banner = () => {
    return (
        <SectionContainer>
            <div className="hero min-h-[80vh] my-5" style={{ backgroundImage: 'url(https://i.ibb.co/NTyfQXB/banner.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-xl">
                        <h1 className="mb-5 text-6xl font-bold">Manage your inventory with ease</h1>
                        <p className="mb-5 text-3xl">Our powerful inventory management software helps you keep track of your stock levels, so you never run out of products again.</p>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

export default Banner;