import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';


const OrderInfo = ({ orderItem}) => {




  return (


            <div class="d-flex">
              <div className="flex-shrink-0">
                <img src={"http://192.168.0.249/ecommerce/image/" + orderItem.picture} alt={orderItem.name} width="200" className="ml-lg-5 order-1 order-lg-2" />

              </div>
              <div className="d-flex align-items-lg-center flex-row flex-lg-row p-3 w-75 p-3">
                <div className="media-body order-2 order-lg-1">
                  <h5 className="mt-0 font-weight-bold mb-2">{orderItem.name}</h5>

                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <h6 className="font-weight-bold my-2">Quantity: {orderItem.order_quantity}</h6>

                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <h6 className="font-weight-bold my-2">Price: RM{orderItem.price}</h6>

                  </div>
                </div>
              </div>

              

            </div>

         
  );
};

export default OrderInfo;