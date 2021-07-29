import { Grid } from '@material-ui/core'
import React from 'react'
import Product from './Product'
import useStyles  from './ListProduct-style'

const  ListProduct = ({ product }) => {
    const classes = useStyles();
    return (
        
        <main className={classes.content}>
            <h1> Product </h1>
            <Grid container justify="center" spacing={3}>
                {product.map((product)=>(
                <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} />
                </Grid>))}
                
            </Grid>
       </main>
       
    )
}


export default ListProduct
