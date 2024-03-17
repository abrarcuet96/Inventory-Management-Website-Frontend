import { useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";

const Subscription = () => {
    const highlightText2 = {
        background: 'linear-gradient(to bottom, transparent 70%, #32E0C4 30%)'
    }
    const [subscription, setSubscription] = useState([]);
    useEffect(() => {
        fetch('/subscription.json')
            .then(res => res.json())
            .then(data => setSubscription(data))
    }, [])
    return (
        <div className="flex flex-col justify-around min-h-[100vh]">
            <div>
                <h2 className="text-center text-6xl font-semibold mt-10 mb-10 text-[#222831]"><span style={highlightText2}>
                Increase Your Product Limit Here!!</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 m-5">
                {
                    subscription.map(subCard => <SubscriptionCard key={subCard.id} subCard={subCard} subscription={subscription}></SubscriptionCard>)
                }
            </div>
            <div className="m-5">
                <h2 className="text-2xl text-bg-[#222831] font-bold my-2">Unlock Premium Access with Our Subscription Plans:</h2>
                <p className="text-xl my-2">At InvigoNex, we believe in providing our members with unparalleled access to premium content and exclusive benefits. Choose from our range of subscription plans to unlock the full potential of our platform and take your experience to the next level.</p>
                <h2 className="text-2xl text-bg-[#222831] font-bold my-2">How to Subscribe:</h2>
                <p className="text-xl my-2">Select Your Plan: Choose the subscription plan that best suits your requirements and budget.</p>
                <p className="text-xl my-2">Complete Payment: Follow the prompts to complete the payment process securely.</p>
                <p className="text-xl my-2">Start Exploring: Once subscribed, dive into our platform and discover a world of premium content tailored just for you.</p>
            </div>
        </div>
    );
};

export default Subscription;