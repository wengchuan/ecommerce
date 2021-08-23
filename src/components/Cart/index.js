import React, { useState, useEffect, useContext } from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MyContext } from "../../context/MyContext"
import Cart from './CartItem';
import useStyles from './style';
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_live_51JP9voBriOGseYlOdpnWpseH1Ra5mYsEBdXyj3SN1nOoB2QZsMB8Qf3a4njs71RfKhORrTv3Pe73qZh5G23rjFXI0027YlDx6o")

const CartList = () => {


  const [cartItem, setCart] = useState([]);
  const [id,setId] = useState({});
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


  const classes = useStyles();
  const DeteleItem = async (itemID) => {
    
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

        await axios.get('http://192.168.0.249/ecommerce/deleteitem.php', {
          params: {
            uid: data.user.uid,
            pid: itemID
          }
        })
        fectCartItem();

      }

    }



  }





  let y = Math.round(cartItem.reduce((total, cartItem) => total += Number(cartItem.price) * Number(cartItem.cart_quantity), 0) * 100) / 100;

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">You have no items in your shopping cart,
      <Link className={classes.link} to="/">start adding some</Link>!
    </Typography>
  );


 
  const renderCart = () => (
    <>
     
      <Grid container spacing={3}>
        {cartItem.map((cartItem) => (
          <Grid item xs={12} key={cartItem.id}>
            <Cart cartItem={cartItem} DeteleItem={DeteleItem} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal:RM {y}</Typography>
        {console.log(Number(cartItem[0].cart_quantity))}
        <div>
         <Link to={{pathname:'/checkout',state:{totalCost:y,cartItem:cartItem,uid:id}}}>
          <Button className={classes.checkoutButton}   size="large" type="button" variant="contained" color="primary">Checkout</Button>
          </Link>
          </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
      
      {cartItem.length == 0 ? renderEmptyCart() : renderCart()}

    </Container>
  );
};

export default CartList
