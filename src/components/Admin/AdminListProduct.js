import { Grid } from '@material-ui/core'
import React, { useState, useEffect,useRef } from 'react'
import AdminProduct from './AdminProduct'
import axios from 'axios';
import Swal from 'sweetalert2'
const ListProduct = ({product,fetchProducts}) => {
 

    console.log(product)
    
    const DeleteProduct = async (productID) => {
     
        Swal.fire({
            title: 'Do you want to Delete product?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
          }).then( async (result) => {
            if (result.value) {
                const deleteProduct =  await axios.get('http://192.168.0.249/ecommerce/deleteproduct.php', {
                    params: {
          
                      id: productID
                    }
                  })
                  if(deleteProduct.data.success){
                      Swal.fire({
                          title: 'Product deleted',
                          text: deleteProduct.data.message,
                          type: 'success',
          
                      });
                      fetchProducts();
                  }
                  else{
                      Swal.fire({
                          title: 'Failed',
                          text:  deleteProduct.data.message,
                          type: 'error',
          
                      });
                  }
      
            } 
          })

        
     
          
    
          }
    
        
    

    return (

        <main>
            <Grid container spacing={3}>
                {product.map((product) => (
                    <Grid key={product.id} item xs={12} >
                        
                        <AdminProduct  product={product} DeleteProduct={DeleteProduct} fetchProducts={fetchProducts} />
                    </Grid>))}

            </Grid>
        </main>

    )
}


export default ListProduct
