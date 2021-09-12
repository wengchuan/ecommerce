import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";
export default function CheckoutForm({totalCost,cartItem,uid}) {

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {

    // Create PaymentIntent as soon as the page loads
    window
      .fetch("http://localhost:4242/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: (totalCost*100)})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      const add = await axios.post('http://localhost/ecommerce/addorder.php',{
          uid:uid,
          pid:pid,
          cart_quantity:quantity,
          totalPrice:totalCost
      });

    }
  };
  
  var pid = cartItem.map((cartItem) => cartItem.id);
  var quantity = cartItem.map((cartItem) => cartItem.cart_quantity);
      


  return (
    
    <div className="payment">
      
    <form className="payment-form" id="payment-form" onSubmit={handleSubmit}>
    <h3>Total:{totalCost} </h3>
    <h4>Please enter your credit card information </h4>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button className="btn-submit"
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
       </form>
      {/* Show a success message upon completion */}
    {succeeded ?  <Redirect
      to={{
        pathname: "/payment_complete",
        state: {succeeded:succeeded,}
      }}
    />: null }
      
   
    </div>
  );
}