import { CardMedia,Card,CardActions, CardContent, IconButton, Typography } from '@material-ui/core'

import React from 'react'
import { Link } from 'react-router-dom';
import useStyles from './style';

function SearchProduct({product,handleAddToCart}) {
    const classes = useStyles();

    return (
       <Card className={classes.root}>
           <Link to={`/product/${product.id}`} style={{ textDecoration: 'none',color:"black" }}>
           <CardMedia className={classes.media} image={"http://192.168.0.249/ecommerce/image/"+product.picture} title ={product.name} />
           <CardContent>
               <div className={classes.CardContent}>
                   <Typography variant="h5" gutterBottom className={classes.productName}>
                     {product.name}
                   </Typography>
                   <Typography variant="h5">
                    RM {product.price}
                   </Typography>
               </div>
            
           </CardContent>
           </Link>
            <CardActions disableSpacing className={classes.CardActions}>
                <IconButton aria-label="Add to Cart" onClick={()=> handleAddToCart(product.id,1)}>
                    <Typography>
                        Add to Cart
                    </Typography>
                    
                </IconButton>
            </CardActions>


       </Card>
    )
}

export default SearchProduct
