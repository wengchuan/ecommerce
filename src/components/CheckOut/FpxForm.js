import React, { useEffect, useState } from 'react';
import { withRouter, useLocation, Link } from 'react-router-dom';
import { FpxBankElement, useStripe, useElements } from '@stripe/react-stripe-js';
import StatusMessages, { useMessages } from './StatusMessages';
import axios from "axios";

const FpxForm = ({ totalCost, cartItem, uid }) => {
    console.log(totalCost)
    const stripe = useStripe();
    const elements = useElements();
    const [messages, addMessage] = useMessages();

    const handleSubmit = async (e) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            addMessage('Stripe.js has not yet loaded.');
            return;
        }

        let { error: backendError, clientSecret } = await fetch(
            'http://localhost:4242/create-fpx-intent',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: (totalCost * 100),
                    paymentMethodType: 'fpx',
                    currency: 'myr',
                }),
            }
        ).then((r) => r.json());

        if (backendError) {
            addMessage(backendError.message);
            return;
        }



        let { error: stripeError, paymentIntent } = await stripe.confirmFpxPayment(
            clientSecret,
            {
                payment_method: {
                    fpx: elements.getElement(FpxBankElement),
                },
                return_url: `${window.location.origin}/fpx?return=true`,
            }
        );

        if (stripeError) {
            // Show error to your customer (e.g., insufficient funds)
            addMessage(stripeError.message);
            return;
        }

        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
    };

    return (
        <>
            <h1>FPX</h1>

            <form id="payment-form" onSubmit={handleSubmit}>
                <FpxBankElement options={{ accountHolderType: 'individual' }} />
                <button className="btn btn-primary" type="submit">Pay</button>
            </form>

            <StatusMessages messages={messages} />
        </>
    );
};

// Component for displaying results after returning from
// bancontact redirect flow.
const FpxReturn = () => {
    const stripe = useStripe();
    const [messages, addMessage] = useMessages();
    const [cartItem, setCart] = useState([]);
    const [id, setId] = useState({ });
    var fetched = false;


    const query = new URLSearchParams(useLocation().search);
    const clientSecret = query.get('payment_intent_client_secret');
    const isError = query.get('redirect_status');

    useEffect(() => {

        if (!stripe) {
            return;
        }
        const fetchPaymentIntent = async () => {
            const { error, paymentIntent } = await stripe.retrievePaymentIntent(
                clientSecret
            );
            if (error) {
                addMessage(error.message);

            }
        


            addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
        };
        const fectCartItem = async () => {


            const loginToken = localStorage.getItem('loginToken');
            const Axios = axios.create({
                baseURL: 'http://34.92.49.138/ecommerce/php-login-registration-api/',
            });
            // If inside the local-storage has the JWT token
            if (loginToken) {

                //Adding JWT token to axios default header
                Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

                // Fetching the user information
                const { data } = await Axios.get('user-info.php');



                // If user information is successfully received
                if (data.success && data.user) {

                    setId(data.user.uid)
                    await axios.get('http://34.92.49.138/ecommerce/fetchcart.php', {
                        params: {
                            uid: data.user.uid
                        }
                    }).then(res => {
                        setCart(res.data);
                        fetched=true;
                        console.log("asdasdasd")
                    })


                }

            }


        }


        fetchPaymentIntent();

        fectCartItem();

    }, [clientSecret, stripe, addMessage]);

    if (isError == 'failed') {
        var errorMessage = ["Payment Failed, please try again."];
        return (
            <div>
                <h1>FPX Return</h1>

                <StatusMessages messages={errorMessage} />
            </div>
        );
    }
    else if (isError == 'succeeded') {
     
       
        let totalCost = Math.round(cartItem.reduce((total, cartItem) => total += Number(cartItem.price) * Number(cartItem.cart_quantity), 0) * 100) / 100;
        var pid = cartItem.map((cartItem) => cartItem.id);
        var quantity = cartItem.map((cartItem) => cartItem.cart_quantity);

        const addorder = async () => {
            const add = await axios.post('http://34.92.49.138/ecommerce/addorder.php', {
                uid: id,
                pid: pid,
                cart_quantity: quantity,
                totalPrice: totalCost
            });
        }


            let   succeeded =true
            var successMessage = ["Payment success!"];
        return (
            <div>
                <h1>FPX Return</h1>
                
                <StatusMessages messages={successMessage} />
                <Link to={{ pathname: '/payment_complete', state: {succeeded:succeeded, } }} style={{ textDecoration: 'none', color: "black" }}>
                <button className="btn btn-primary" onClick={addorder} >Continue</button>
                </Link>
            </div>
        );
        }

    }


const Fpx = ({ totalCost, cartItem, uid }) => {
    const query = new URLSearchParams(useLocation().search);

    if (query.get('return')) {
        return <FpxReturn />;
    } else {
        return <FpxForm totalCost={totalCost} cartItem={cartItem} uid={uid} />;
    }
};

export default withRouter(Fpx);