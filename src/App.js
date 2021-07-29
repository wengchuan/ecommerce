import React from "react"
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';

import Navbar from './components/Navbar/Navbar';
import ListProduct from './components/Product/ListProduct';
import SlideShow from './components/SlideShow/SlideShow';
import Product from './Product/'

function App() {
  const [product, setProducts] = React.useState([]);
  const fetchProducts = async () => {

    axios.get('http://192.168.0.249/ecommerce/').then(res => {
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
        <Navbar />
        <Switch>

          <Route exact path="/">

            <SlideShow />
            <ListProduct product={product} />
          </Route>



          <Route exact path='/product' component={Product} />
        </Switch>

        <Footer />
      </Router>





    </div >

  );
}

export default App;