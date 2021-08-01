import React, { useState, useContext } from "react"
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Footer from './components/Footer/Footer';

import Navbar from './components/Navbar/Navbar';
import ListProduct from './components/Product/ListProduct';
import SlideShow from './components/SlideShow/SlideShow';
import Product from './pages/Product/'
import Login from "./pages/Login";
import MyContextProvider, { MyContext } from "./context/MyContext"
import UserProfile from "./components/UserProfile/UserProfile"
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


  return (

    <div>

      <Router>

        <Switch>

          <Route exact path="/" render={() => (
            <div>
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

          <Route exact path="/login" render={() => (
            <div>
              <Navbar />
              {console.log(isAuth+"login")}
              {isAuth ? <Redirect to="/profile" /> : <Login />}
            </div>
          )} />


          <Route exact path="/profile" render={() => (
            <div>
              <Navbar />
              {console.log(isAuth)}
              {isAuth ? <UserProfile /> : <Redirect to="/login" />}

            </div>
          )} />
        </Switch>

        <Footer />
      </Router>





    </div >

  );
}

export default App;