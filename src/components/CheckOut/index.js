import React from 'react'
import Button from '@material-ui/core/Button';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { useLocation, Redirect, Link } from "react-router-dom"
function Index() {
  try {
    const location = useLocation()
    const { totalCost, cartItem, uid } = location.state

    return (
      <div className="back">


        <div className="div-center w-50">


          <div className="content">
            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Select your payment </p>
            <center>
              <form>

                <div className="form-group">
                  <Link to={{ pathname: '/credit_card', state: { totalCost: totalCost, cartItem: cartItem, uid: uid } }} style={{ textDecoration: 'none', color: "black" }}>
                    <Button style={{ marginBottom: "20px" }}
                      variant="contained"
                      color="default"

                      startIcon={<CreditCardIcon />}
                    >
                      Credit Card
                    </Button>
                  </Link>
                </div>

                <div className="form-group">
                  <Link to={{ pathname: '/fpx', state: { totalCost: totalCost, cartItem: cartItem, uid: uid } }} style={{ textDecoration: 'none', color: "black" }}>
                    <Button
                      variant="contained"
                      color="default"

                      startIcon={<AccountBalanceIcon />}
                    >
                      Online Banking/FPX
                    </Button>
                  </Link>
                </div>


              </form>
            </center>
          </div>
        </div>
      </div>

    )
  }
  catch (err) {
    return (
      <Redirect
        to="/"
      />
    )
  }
}

export default Index
