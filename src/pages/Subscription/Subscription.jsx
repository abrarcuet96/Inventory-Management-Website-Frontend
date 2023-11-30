import { useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";

const Subscription = () => {
    const [subscription, setSubscription]= useState([]);
    useEffect(()=>{
        fetch('/subscription.json')
        .then(res=>res.json())
        .then(data=> setSubscription(data))
    },[])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 m-5 xl:my-44">
            {
                subscription.map(subCard=> <SubscriptionCard key={subCard.id} subCard={subCard} subscription={subscription}></SubscriptionCard>)
            }
        </div>
    );
};

export default Subscription;