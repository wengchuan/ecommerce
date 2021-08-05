import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import HouseIcon from '@material-ui/icons/House';
import CreateIcon from '@material-ui/icons/Create';
import PageviewIcon from '@material-ui/icons/Pageview';
import SideBar from './sidebar'
import ManageProduct from './ManageProduct';
function index() {
    
    return (

        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link  to="/admin" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">Admin</span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <Link to="/" className="nav-link align-middle px-0">
                                    <HouseIcon /><span className="ms-1 d-none d-sm-inline">Home</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/manage" className="nav-link align-middle px-0">
                                    <CreateIcon /><span className="ms-1 d-none d-sm-inline">Manage Product</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/order" className="nav-link align-middle px-0">
                                    <PageviewIcon /><span className="ms-1 d-none d-sm-inline">View Order</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col py-3">
                    <Router>
                        <Switch>
                            <Route exact path="/admin" render={() => (
                                <div>
                                    <center> <h1>Welcome To Admin Page</h1> </center>
                                </div>
                            )} />

                            <Route exact path="/admin/manage" render={() => (
                                <div>
                                    <ManageProduct />
                                </div>
                            )} />
                        </Switch>
                    </Router>


                </div>
            </div>
        </div>
    )
}

export default index
