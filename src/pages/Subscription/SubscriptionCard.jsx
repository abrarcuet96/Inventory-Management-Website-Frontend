import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const SubscriptionCard = ({ subCard, subscription }) => {
    const [subId, setSubId] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [filteredSub, setFilteredSub] = useState({});
    const handleSubCard = id => {
        setSubId(id);
        console.log(id);
        const filterSub = subscription.filter(item => item.id === subCard.id);
        console.log(filterSub);
        setFilteredSub(filterSub);
        setShowButton(true);
    }
    return (
        <div className=" p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <Helmet>
                <title>InvigoNex | Checkout</title>
            </Helmet>
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{subCard.plan} plan</h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
                <span className="text-3xl font-semibold">$</span>
                <span className="text-5xl font-extrabold tracking-tight">{subCard.payment}</span>
                <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400"></span>
            </div>
            <ul role="list" className="space-y-5 my-7">
                <li className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">Increase the limit to {subCard.limit}</span>
                </li>
            </ul>
            <button onClick={() => handleSubCard(subCard.id)} type="button" className="text-[#222831] hover:bg-[#32E0C4] bg-[#5be2cc] focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg px-5 py-2.5 inline-flex justify-center w-full text-center text-xl" >Purchase</button>
            {
                showButton ?
                    <Elements stripe={stripePromise}>
                        <CheckoutForm subCard={filteredSub[0]} subId={subId}></CheckoutForm>
                    </Elements> : ''
            }

        </div>

    );
};

export default SubscriptionCard;