import React, { useState, useEffect, useContext } from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OrderList from './OrderList';
import useStyles from './style';
const Index =()=> {

    const [orderItem, SetOrder] = useState([]);
    const classes = useStyles();
    const fetchOrder = async () => {


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
    
            await axios.get('http://34.92.49.138/ecommerce/fetchorder.php', {
              params: {
                uid: data.user.uid
              }
            }).then(res => {
              SetOrder(res.data);
            })
    
     
          }
    
        }
    }


      useEffect(() => {
    
        fetchOrder();
      }, []);
      console.log(orderItem);


    const renderOrder = () => (
        <div>

            {orderItem.map((orderItem) => (

              <div key={orderItem.id}>
                  <p>{orderItem.time} </p>
                <OrderList orderItem={orderItem} />
             </div>
            ))}
          
        </div>
      )

      const renderEmptyOrder = () => (
        <Typography variant="subtitle1">You have no order. 
        
        </Typography>
      );
    
    
      return (
          
          
        <Container>
          <div className={classes.toolbar} />
          <Typography className={classes.title} variant="h3" gutterBottom>Your Order</Typography>
          
          {orderItem.length == 0 ? renderEmptyOrder() : renderOrder()}
    
        </Container>
      );
    
  
}

export default Index
