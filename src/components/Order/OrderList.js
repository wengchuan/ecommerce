import React from 'react'
import OrderInfo from './OrderInfo';
function OrderList(orderItem) {

  return (

    <div className="row">
      <div className="col-lg-8 mx-auto">
      
        <ul className="list-group shadow">
          

          <li className="list-group-item">
          <div className="float-end">
              <p>Order Status:{orderItem.orderItem[0].status} </p>
              </div>
            <h4>Order ID: {orderItem.orderItem[0].oid} </h4>
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
  )
}

export default OrderList
