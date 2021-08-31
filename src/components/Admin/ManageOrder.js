import React, { useState, useEffect, useContext } from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OrderList from './OrderList';
import useStyles from './style';

function ManageOrder() {

  const [orderItem, setOrder] = useState([]);
  const [state, setState] = useState({ status: ""  });
  const classes = useStyles();
  const fetchOrder = async () => {

    axios.get('http://34.92.49.138/ecommerce/fetchallorder.php').then(res => {
      setOrder(res.data);
    })
  };



  useEffect(() => {

    fetchOrder();
  }, []);

  const onChangeValue = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value


    });

   sortOrder(e.target.value);

  }


  const sortOrder  = async (value) => {
    await axios.get('http://34.92.49.138/ecommerce/sortorder.php', {
      params: {
        status: value
      }

    }).then(res => {
      setOrder(res.data);
    })
console.log(value)

  }



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

      <Typography className={classes.title} variant="h3" gutterBottom>View Order</Typography>
      <div className="d-flex flex-row bd-highlight mb-3 w-25">
        
        <select class="form-select " value={state.status} name="status" onChange={onChangeValue}>
          <option selected value="">Sort by order status</option>
          <option value="Order Placed">Order Placed</option>
          <option value="Paid">Paid</option>
          <option value="Order Confirmed">Order Confirmed</option>
          <option value="Order Shipped Out">Order Shipped Out</option>
          <option value="Order Completed">Order Completed</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Order Returned">Order Returned</option>
        </select>
        <button className="btn btn-primary ms-2" onClick={()=>{fetchOrder(); state.status=""}}>Reset</button>
      </div>
      {orderItem.length == 0 ? renderEmptyOrder() : renderOrder()}

    </Container>
  );


}

export default ManageOrder
