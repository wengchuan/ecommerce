import React from 'react'
import axios from 'axios';
import ListProduct from "../../components/Product/ListProduct"
function Product({handleAddToCart}) {
    const [product, setProducts] =React.useState([]);
    const fetchProducts = async () => {
      
      axios.get('http://192.168.0.249/ecommerce/fetchproduct.php').then(res=>
      {
        setProducts(res.data);
      }
      ) 
     
    };
  
    React.useEffect(() => {
      fetchProducts();
    
    }, []);

    return (
        <div>
            <ListProduct product={product} handleAddToCart={handleAddToCart}/>
        </div>
    )
}

export default Product
