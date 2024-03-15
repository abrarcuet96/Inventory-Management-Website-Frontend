import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './Banner.css';
import { Navigation } from 'swiper/modules';
import b1 from '../../assets/b1.jpg';
import b2 from '../../assets/b2.jpg';
import b3 from '../../assets/b3.jpg';
const Banner = () => {
    return (
        <div className="bg-[#222831]">
            <div className="flex max-w-screen-2xl mx-auto">
                <div className="w-1/2 flex items-center">
                    <div>
                        <p className="text-6xl text-white font-bold my-9"><span className="text-7xl text-[#32E0C4]">Inventory</span> <br /> Management System</p>
                        <p className="text-2xl text-white mb-9">Streamline Your Business with our Comprehensive Inventory Management System: Effortless Tracking, Seamless Integration, Maximum Efficiency!</p>
                        <button className="text-2xl font-semibold text-[#32E0C4] hover:border-b-4 hover:border-[#32E0C4]">Get Started</button>
                    </div>
                </div>
                <div className="w-1/2 py-10">
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper rounded-xl">
                        <SwiperSlide>
                            <img src={b1} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={b2} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={b3} alt="" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Banner;