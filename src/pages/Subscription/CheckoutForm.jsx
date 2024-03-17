import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import './CheckoutForm.css'
import useAuth from '../../hooks/useAuth'
import { ImSpinner9 } from 'react-icons/im'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import useAdmin from '../../hooks/useAdmin'
import useAllPurchase from '../../hooks/useAllPurchase'
import usePurchase from '../../hooks/usePurchase'
import useOnlyShop from '../../hooks/useOnlyShop'

const CheckoutForm = ({ subCard }) => {
    const [userPurchaseData, purchaseLoading] = usePurchase();
    const [maxPurchase, setMaxPurchase] = useState(0);
    const [productLimit, setProductLimit] = useState(0);
    const [userAllPurchaseData] = useAllPurchase();
    const [totalAdminIncome, setTotalAdminIncome] = useState(0);
    const [shopData]= useOnlyShop();
    useEffect(() => {
        const totalPrice = userAllPurchaseData.reduce((sum, currObj) => {
            return sum + currObj.price;
        }, 0);
        setTotalAdminIncome(totalPrice);
    }, [userAllPurchaseData])
    const [adminData, refetch] = useAdmin();
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();
    const paymentInt = subCard.payment;
    useEffect(() => {
        console.log(userPurchaseData.length);
        if (userPurchaseData.length > 0) {
            const maxPriceObj = purchaseLoading ? '' : userPurchaseData.reduce((maxObj, currentObj) => {
                return currentObj.price > maxObj.price ? currentObj : maxObj;
            }, userPurchaseData[0]);
            console.log(maxPriceObj.price);
            setMaxPurchase(maxPriceObj.price);
            console.log(maxPurchase);
            if (maxPurchase === 10) { setProductLimit(200); console.log(productLimit); }
            else if (maxPurchase === 20) { setProductLimit(450); console.log(productLimit); }
            else if (maxPurchase === 50) { setProductLimit(1500); console.log(productLimit); }
            else { setProductLimit(3) }
            console.log(productLimit);
        } else { setProductLimit(3); console.log(productLimit); }
    }, [userPurchaseData, purchaseLoading, maxPurchase, productLimit])
    // Create Payment Intent
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: paymentInt })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            })
    }, [paymentInt, axiosSecure])



    const handleSubmit = async event => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log('error', error)
            setCardError(error.message)
        } else {
            console.log('payment method', paymentMethod);
            setCardError('')
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous',
                    },
                },
            })

        if (confirmError) {
            console.log(confirmError)
            setCardError(confirmError.message)
        } else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {

                // ---->
                const paymentInfo = {
                    email: user?.email,
                    price: paymentInt,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                }
                const res = await axiosSecure.post('/purchase', paymentInfo);
                if (res.data?.insertedId) {
                    setProcessing(false);
                    Swal.fire({
                        title: "Are you sure?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes!"
                    }).then(res => {
                        console.log(res);
                        if (res.isConfirmed) {
                            // admin info update:
                            const userAdminInfo = {
                                ...adminData[0],
                                income: totalAdminIncome + paymentInt
                            }
                            console.log(userAdminInfo);
                            axiosSecure.patch(`/users`, userAdminInfo)
                                .then(res => {
                                    console.log(res);
                                    if (res.data.acknowledged) {
                                        Swal.fire({
                                            title: "Paid!",
                                            text: "Your payment is succeeded",
                                            icon: "success"
                                        });

                                        navigate('/dashboard/managerHome');
                                    }
                                })
                            const shopInfoUpdate = {
                                ...shopData[0],
                                productLimit: productLimit
                            }
                            console.log(shopInfoUpdate);
                            axiosSecure.patch(`/shops`, shopInfoUpdate)
                        }
                    })

                }
                refetch();
            }

        }




    }

    return (
        <>
            <form className='my-2' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='flex mt-2 justify-around'>
                    <button
                        type='submit'
                        disabled={!stripe || !clientSecret || processing}
                        className='inline-flex justify-center rounded-md border border-transparent text-[#222831] hover:bg-[#32E0C4] bg-[#5be2cc] px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                    >
                        {processing ? (
                            <ImSpinner9 className='m-auto animate-spin' size={24} />
                        ) : (
                            `Pay ${subCard.payment}$`
                        )}
                    </button>
                </div>
            </form>
            {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
        </>
    )
}

export default CheckoutForm;