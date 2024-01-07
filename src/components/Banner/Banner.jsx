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
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
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
    );
};

export default Banner;