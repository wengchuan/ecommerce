import React, { useState, useEffect, useRef } from 'react'
import OrderInfo from './OrderInfo';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, Tooltip } from '@material-ui/core'
import axios from 'axios';
import Swal from 'sweetalert2'
function OrderList(orderItem) {

    const [state, setState] = useState({});
    const [state2, setState2] = useState({});
    useEffect(() => {
        setState(orderItem.orderItem[0])
        setState2(orderItem.orderItem[0])
    }, []);

 
    const onChangeValue = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value


        });

    }
 

    const updateorder = async (event) => {
        console.log(state.status)
        console.log(state.tracking_number)
        event.preventDefault();

            const fd = new FormData();
            fd.append('status', state.status);
            fd.append('oid', state.oid);
            fd.append('tracking_number',state.tracking_number);
            
            const update = await axios.post('http://192.168.0.249/ecommerce/updateorder.php',fd);
       
            if (update.data.success) {
                Swal.fire({
                    title: 'Product updated',
                    text: "Product updated",
                    type: 'success',
    
                });
                setState2({
                    ...state2,
                    status:state.status,
                    tracking_number:state.tracking_number
                    
                })
            }
            else {
                Swal.fire({
                    title: 'Failed',
                    text: "Failed to update Product",
                    type: 'error',
    
                });
            }
        
       
    }
    return (
        <div>
            <div className="row">
                <div className="col-lg-8 mx-auto">

                    <ul className="list-group shadow">


                        <li className="list-group-item">
                            <div className="float-end">
                                <Tooltip title="Edit Order Status">
                                    <IconButton aria-label="Edit Order Status" data-bs-toggle="modal" data-bs-target={"#id" + String(orderItem.orderItem[0].oid)}>
                                        <EditIcon ></EditIcon>
                                    </IconButton>
                                </Tooltip>
                                <p>Order Status:{ state2.status} </p>
                                <p>Tracking Number: { state2.tracking_number} </p>
                            </div>
                            <h4>Order ID: {orderItem.orderItem[0].oid} </h4>
                            <h4>User ID: {orderItem.orderItem[0].uid} </h4>
                            <p>User Name: {orderItem.orderItem[0].user_name} </p>
                            <p>User Email: {orderItem.orderItem[0].user_email} </p>
                            <p>User Phone Number: {orderItem.orderItem[0].user_phone} </p>
                            <p>User Address: {orderItem.orderItem[0].user_address+","+orderItem.orderItem[0].user_zip+" "+orderItem.orderItem[0].user_city+","+orderItem.orderItem[0].user_state} </p>
                            <div className="d-flex flex-row bd-highlight mb-3">
                                <p>Order Time :{orderItem.orderItem[0].time} </p>
                              
                            </div>
                            {orderItem.orderItem.map((orderItem) => (

                                <div key={orderItem.id}>
                                    <OrderInfo orderItem={orderItem} />
                                </div>
                            ))}
                            <h4>Total Price : {orderItem.orderItem[0].total_price}</h4>
                        </li>
                    </ul>

                </div>
            </div>
            <div>
                <div className="modal fade" id={"id" + String(orderItem.orderItem[0].oid)} tabindex="-1" aria-labelledby="changeuserinfo" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="title">Update Order Status</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={updateorder}>
                                    <div className="mb-3">
                                        <label > Order Status </label>
                                        <select class="form-select" aria-label="Default select example" name ="status" onChange={onChangeValue}>
                                            <option selected value={state2.status}>{state2.status}</option>
                                            <option value="Order Placed">Order Placed</option>
                                            <option value="Order Shipped Out">Order Shipped Out</option>
                                            <option value="Order Completed">Order Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                            <option value="Order Returned">Order Returned</option>
                                        </select>
                                     
                                    </div>
                                    <div className="mb-3">
                                        <label for="tracking_number" className="col-form-label">Tracking Number:</label>
                                       <input type="text" className="form-control" id="tracking_number" name="tracking_number" value={state.tracking_number} onChange={onChangeValue} />
                                    </div>


                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                                        <button type="submit" className="btn btn-primary">Update</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default OrderList
