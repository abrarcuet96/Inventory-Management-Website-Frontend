
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import SectionContainer from '../Container/SectionContainer';
const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://inventory-management-system-backend-1pzhvx20o.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [])
    return (
        <SectionContainer>
            <div className='my-5'>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        reviews.map(review => <SwiperSlide
                            key={review._id}
                        >
                            <div className="my-16 mx-24 flex flex-col items-center">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p className="py-8">{review.details}</p>
                                <h3 className="text-4xl text-orange-500">{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </SectionContainer>
    );
};

export default Testimonials;