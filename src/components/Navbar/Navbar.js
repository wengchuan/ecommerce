import React from 'react'

import { Badge, IconButton, Tooltip } from '@material-ui/core';
import { AccountCircle, ShoppingCart } from '@material-ui/icons'
import { NavLink } from 'react-router-dom';
import logo from './logo.png'


function Navbar() {

  const [isNavCollapsed, setIsNavCollapsed] = React.useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top ">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="" width="100" height="40" />
        </NavLink>



        <form className="d-flex col-lg-7">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_target" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-end`} id="collapse_target" >
          <div className="navbar-nav" >
            
              <NavLink className="nav-link" exact to="/Product" >Product</NavLink>
              <NavLink className="nav-link" to="/Contact" >Contact Us</NavLink>
              <NavLink className="nav-link" to="/About">About Us</NavLink>

              <NavLink to="/">
                <Tooltip title="Show Cart items">
                  <IconButton aria-label="Show Cart items">
                    <Badge badgeContent={0} color="secondary">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </NavLink>

              <NavLink to="/login">
                <Tooltip title="Login/Sign Up">
                  <IconButton aria-label="Login/Sign Up">
                    <AccountCircle />
                  </IconButton>
                </Tooltip>
              </NavLink>

            
          </div>
        </div>

      </div>



    </nav>
  )
}


export default Navbar
