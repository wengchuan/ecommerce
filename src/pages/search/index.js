import { Grid,Typography } from '@material-ui/core'
import React from 'react'
import Product from './SearchProduct'
import useStyles  from './ListProduct-style'
import { useLocation } from 'react-router-dom';
const  SearchListProduct = ({  handleAddToCart }) => {
    const location = useLocation()
    const { product } = location.state
    const classes = useStyles();
    console.log(product)
    const renderProduct =()=>(
        <Grid container justify="center" spacing={3}>
                {product.map((product)=>(
                <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} handleAddToCart={handleAddToCart} />
                </Grid>))}
                
            </Grid>
    )

    const renderEmpty = () =>(
        <Typography variant="subtitle1">Product is not found
      </Typography>

    )


    return (
        
        <main className={classes.content}>
            <h1> Product </h1>
            {Object.entries(product).length === 0 ? renderEmpty() : renderProduct()}
       </main>
       
    )
}


export default SearchListProduct
