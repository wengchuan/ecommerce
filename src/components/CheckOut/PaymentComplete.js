import React from 'react'
import { useLocation,Redirect, Link } from 'react-router-dom';

function PaymentComplete() {
    try{
    const location = useLocation()
    const { succeeded } = location.state
    if(succeeded){
    return (
        <div>
            <center>
                <h1> Thank you for purchase </h1>
                <h3>Your can check your order<Link to="/order"> here </Link> or at the order page.</h3>
                
            </center>
        </div>
    )
    }
    else{
        return(

            <Redirect
      to="/"
    />
        )
    }
}
catch(err){
    return(

        <Redirect
  to="/"
/>
    )
}
   
}

export default PaymentComplete
