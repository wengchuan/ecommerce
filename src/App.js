import React, { useState, useContext } from "react"
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Footer from './components/Footer/Footer';

import Navbar from './components/Navbar/Navbar';
import ListProduct from './components/Product/ListProduct';
import SlideShow from './components/SlideShow/SlideShow';
import Product from './pages/Product/'
import Login from "./pages/Login";
import { MyContext } from "./context/MyContext"
import UserProfile from "./components/UserProfile/UserProfile"
import Admin from "./components/Admin"
import ManageProduct from "./components/Admin/ManageProduct"
import ProductDetail from "./pages/ProductDetail"
import Contact from "./components/Contact"
import AboutUs from "./components/AboutUs"
import Cart from "./components/Cart"
import Register from "./components/Register";
import Search from "./pages/search";
import CheckOut from "./components/CheckOut"
function App() {
  const [product, setProducts] = useState([]);
  const { rootState, logoutUser, AddCart } = useContext(MyContext);
  const { isAuth, theUser, showLogin } = rootState;
  const [cartItem, setCart] = useState([]);
  const [user, setUser] = useState([]);

  const fetchProducts = async () => {

    axios.get('http://192.168.0.249/ecommerce/fetchproduct.php').then(res => {
      setProducts(res.data);
    }
    )

  };

  React.useEffect(() => {

    fetchProducts();
    fectCartItem();

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

  const AddToCart = async (userID, productID, cart_quantity) => {
    const add = await AddCart(userID, productID, cart_quantity);

    Swal.fire(add.message)


  }

  const handleAddToCart = (productID, quantity) => {
    if (theUser.user_role == "guest") {
      Swal.fire('Please login')
      return (<Redirect to="/login" />)
    }
    else {
      AddToCart(theUser.uid, productID, quantity);
    }
  }





  const fectCartItem = async () => {


    const loginToken = localStorage.getItem('loginToken');
    const Axios = axios.create({
      baseURL: 'http://localhost/ecommerce/php-login-registration-api/',
    });
    // If inside the local-storage has the JWT token
    if (loginToken) {

      //Adding JWT token to axios default header
      Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

      // Fetching the user information
      const { data } = await Axios.get('user-info.php');



      // If user information is successfully received
      if (data.success && data.user) {

        console.log("asdasdzxc" + data.user.uid)
        await axios.get('http://192.168.0.249/ecommerce/fetchcart.php', {
          params: {
            uid: data.user.uid
          }
        }).then(res => {
          setCart(res.data);
        })


      }

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
              <ListProduct product={product} handleAddToCart={handleAddToCart} />
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

          <Route path="/product/:productID" render={() => (
            <div>
              <Navbar />
              <ProductDetail handleAddToCart={handleAddToCart} />
            </div>
          )} />

          <Route path="/result" render={() => (
            <div>
              <Navbar />
              <Search handleAddToCart={handleAddToCart} />
            </div>
          )} />

  <Route path="/checkout" render={() => (
            <div>
              <Navbar />
              <CheckOut />
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
          <Route exact path="/Cart" render={() => (
            <div>


              <Navbar />
              <Cart cartItem={cartItem} />
            </div>
          )} />
          <Route exact path="/Register" render={() => (
            <div>


              <Navbar />
              <Register />
            </div>
          )} />
        </Switch>

        <Footer />


      </Router>





    </div >

  );
}

export default App;