import React, { useState, useContext } from "react"
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import Footer from './components/Footer/Footer';

import Navbar from './components/Navbar/Navbar';
import ListProduct from './components/Product/ListProduct';
import SlideShow from './components/SlideShow/SlideShow';
import Product from './pages/Product/'
import Login from "./pages/Login";
import MyContextProvider, { MyContext } from "./context/MyContext"
import UserProfile from "./components/UserProfile/UserProfile"
import Admin from "./components/Admin"
import ManageProduct from "./components/Admin/ManageProduct"
import ProductDetail from "./pages/ProductDetail"
import Contact from "./components/Contact"
import AboutUs from "./components/AboutUs"
function App() {
  const [product, setProducts] = useState([]);
  const { rootState, logoutUser } = useContext(MyContext);
  const { isAuth, theUser, showLogin } = rootState;
  const fetchProducts = async () => {

    axios.get('http://192.168.0.249/ecommerce/fetchproduct.php').then(res => {
      setProducts(res.data);
    }
    )

  };

  React.useEffect(() => {
    fetchProducts();

  }, []);
  const checkAdmin = () => {
    if (theUser.user_role == "admin") {
      return (<div className="d-flex flex-row-reverse">
        <Link style={{ color: "grey" }} className="nav-link" to='/admin'>Admin Page</Link>
      </div>)
    }
    else {
      return null
    }
  }

  return (

    <div>

      <Router>

        <Switch>

          <Route exact path="/" render={() => (
            <div>
              {checkAdmin()}
              
              <Navbar />
              <SlideShow />
              <ListProduct product={product} />
            </div>
          )} />




          <Route exact path="/product" render={() => (
            <div>
              <Navbar />
              <Product />
            </div>
          )} />
             <Route exact path="/About" render={() => (
            <div>
              <Navbar />
              <AboutUs />
            </div>
          )} />

          <Route  path="/product/:productID" render={() => (
            <div>
              <Navbar />
              <ProductDetail />
            </div>
          )} />

          <Route exact path="/login" render={() => (
            <div>
              <Navbar />

              {isAuth ? <Redirect to="/profile" /> : <Login />}
            </div>
          )} />


          <Route exact path="/profile" render={() => (
            <div>
              {checkAdmin()}
              <Navbar />

              {isAuth ? <UserProfile /> : <Redirect to="/login" />}

            </div>
          )} />

          <Route exact path="/admin" render={() => (
            <div>
              {theUser.user_role == "admin" ? <Admin /> : <Redirect to="/" />}

            </div>
          )} />

          <Route exact path="/admin/manage" render={() => (
            <div>
              {theUser.user_role == "admin" ? <div><Admin /> </div> : <Redirect to="/" />}

            </div>
          )} />
    <Route exact path="/Contact" render={() => (
            <div>
              
              
              <Navbar />
              <Contact />
            </div>
          )} />
        </Switch>

        <Footer />


      </Router>





    </div >

  );
}

export default App;