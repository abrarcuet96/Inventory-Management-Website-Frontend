
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { FaQuoteLeft } from "react-icons/fa";
const Testimonials = () => {
    const highlightText = {
        background: 'linear-gradient(to bottom, transparent 70%, #32E0C4 30%)'
    }
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://inventory-management-system-backend-1pzhvx20o.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [])
    return (
        <div className='max-w-screen-xl mx-auto my-20'>
            <p className="text-center text-5xl font-semibold  text-[#222831]"><span style={highlightText} >Testimonials</span></p>
            <div className=''>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        reviews.map(review => <SwiperSlide
                            key={review._id}
                        >
                            <div className=" mx-24 flex flex-col items-center">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <FaQuoteLeft className='text-7xl my-5' />
                                <p className="py-8">{review.details}</p>
                                <h3 className="text-4xl text-orange-500">{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;