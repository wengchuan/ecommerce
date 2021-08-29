import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FpxForm from "./FpxForm";
import "./index.css";
import { useLocation, Redirect } from "react-router-dom"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51JP9voBriOGseYlOIQZ7Pgby4ZJqW754QfvfFr85pNb12c5e34F9BVMMiAcvSonJORTEGGjso7xU853dk7P1Ac1C00MRVzP4aD");
export default function Checkout() {

  const [cartItem, setCart] = useState([]);
  const [id, setId] = useState({ });
  const fectCartItem = async () => {


    const loginToken = localStorage.getItem('loginToken');
    const Axios = axios.create({
      baseURL: 'http://localhost/ecommerce/php-login-registration-api/',
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
        await axios.get('http://192.168.0.249/ecommerce/fetchcart.php', {
          params: {
            uid: data.user.uid
          }
        }).then(res => {
          setCart(res.data);
        })


      }

    }

  }

  useEffect(() => {

    fectCartItem();
  }, []);

  const checkUser = () => {
    const loginToken = localStorage.getItem('loginToken');

    if (loginToken) {
      return (
        <div className="back">


          <div className="div-center w-50">


            <div className="content">
              <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Check Out </p>
              <h4>Total cost:{totalCost} </h4>
              <center>
                

                  <div className="form-group">
                    <Elements stripe={promise}>
                      <FpxForm totalCost={totalCost} cartItem={cartItem} uid={id} />
                    </Elements>
                  </div>
               
              </center>
            </div>
          </div>
        </div>



      );
    }
    else {
      return (

        <Redirect
          to="/"
        />
      )
    }


  }



  let totalCost = Math.round(cartItem.reduce((total, cartItem) => total += Number(cartItem.price) * Number(cartItem.cart_quantity), 0) * 100) / 100;



  try {
    return (
      <div>
        {checkUser()}
      </div>
    );
  }


  catch (err) {
    return (

      <Redirect
        to="/"
      />
    )
  }
}