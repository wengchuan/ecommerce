import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./PaymentForm";
import "./index.css";
import {useLocation,Redirect} from "react-router-dom"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51JP9voBriOGseYlOIQZ7Pgby4ZJqW754QfvfFr85pNb12c5e34F9BVMMiAcvSonJORTEGGjso7xU853dk7P1Ac1C00MRVzP4aD");
export default function Checkout() {
  try{
  const location = useLocation()
  const { totalCost,cartItem,uid } = location.state
  return (
    <div>
      <center><h1>CheckOut</h1> 
      <Elements stripe={promise}>
        <CheckoutForm totalCost={totalCost} cartItem={cartItem} uid={uid} />
      </Elements>
      </center>
    </div>
  );
}


catch(err){
  return(

    <Redirect
to="/"
/>
)
}
}