import React, { useState, useEffect, useContext } from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OrderList from './OrderList';
import useStyles from './style';

function ManageOrder() {

    const [orderItem, setOrder] = useState([]);
    const classes = useStyles();
    const fetchOrder =  async() => {

         axios.get('http://192.168.0.249/ecommerce/fetchallorder.php').then(res => {
              setOrder(res.data);
            })
    };



      useEffect(() => {
    
        fetchOrder();
      }, []);

     

    const renderOrder = () => (
        <div>

            {orderItem.map((orderItem) => (

              <div key={orderItem.id}>
                  <p>{orderItem.time} </p>
                <OrderList orderItem={orderItem}  />
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
          <Typography className={classes.title} variant="h3" gutterBottom>View Order</Typography>
          
          {orderItem.length == 0 ? renderEmptyOrder() : renderOrder()}
    
        </Container>
      );
    
  
}

export default ManageOrder
