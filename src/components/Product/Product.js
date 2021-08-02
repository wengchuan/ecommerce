import { CardMedia,Card,CardActions, CardContent, IconButton, Typography } from '@material-ui/core'

import React from 'react'
import useStyles from './style';

function Product({product}) {
    const classes = useStyles();

 
    return (
       <Card className={classes.root}>
           <CardMedia className={classes.media} image={"http://192.168.0.249/ecommerce/image/"+product.picture} title ={product.name} />
           <CardContent>
               <div className={classes.CardContent}>
                   <Typography variant="h5" gutterBottom>
                     {product.name}
                   </Typography>
                   <Typography variant="h5">
                    RM {product.price}
                   </Typography>
               </div>
            
           </CardContent>
            <CardActions disableSpacing className={classes.CardActions}>
                <IconButton aria-label="Add to Cart">
                    <Typography>
                        Add to Cart
                    </Typography>
                    
                </IconButton>
            </CardActions>


       </Card>
    )
}

export default Product
