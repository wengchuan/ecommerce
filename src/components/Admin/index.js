import React, { useState, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import HouseIcon from '@material-ui/icons/House';
import CreateIcon from '@material-ui/icons/Create';
import PageviewIcon from '@material-ui/icons/Pageview';
import PeopleIcon from '@material-ui/icons/People';
import SideBar from './sidebar'
import ManageProduct from './ManageProduct';
import ManageOrder from './ManageOrder';
import ManageUser from './ManageUser';
import axios from 'axios';
function Index() {
    const location = useLocation();
    const [orderItem, setOrder] = useState([]);

    const fetchOrder = async () => {

        axios.get('http://192.168.0.249/ecommerce/fetchallorder.php').then(res => {
            setOrder(res.data);
        })
    };
    useEffect(() => {

        fetchOrder();
    }, []);

    let y = Math.round(orderItem.reduce((total, orderItem) => total += Number(orderItem[0].total_price) , 0) * 100) / 100;
    let x = orderItem.reduce((total, orderItem) => total +=1 , 0) ;
    return (

        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link to="/admin" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
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
                                    <PageviewIcon /><span className="ms-1 d-none d-sm-inline">Manage Order</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/user" className="nav-link align-middle px-0">
                                    <PeopleIcon /><span className="ms-1 d-none d-sm-inline">Manage User</span>
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
                                    <h3>Total Sale:RM{y}</h3>
                                    <h3>Total Order: {x}</h3>
                                    <br />
                                    <br />
                                    <h3>View Stripe dashboard</h3>
                                   
                                    <a href="https://dashboard.stripe.com/dashboard">
                                    <button className="btn btn-primary">Dashboard</button>
                                    </a>

                                </div>
                            )} />

                            {location.pathname == "/admin/manage" ? <ManageProduct /> : null}

                            {location.pathname == "/admin/order" ? <ManageOrder /> : null}
                            {location.pathname == "/admin/user" ? <ManageUser /> : null}
                        </Switch>
                    </Router>


                </div>
            </div>
        </div>
    )
}

export default Index
