import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-ui/core';

function ProductCard({handleAddToCart}) {
    const [quantity, setQuantity] = useState(1);
    const initialState = [
        {
            name: '',
            price: '',
            description: '',
            picture: '',
            quantity: '',
            category: '',
        },

    ]
    const increment =()=>{
        setQuantity(quantity + 1);
    }
    const decrement =()=>{
        if(quantity>0){
        setQuantity(quantity - 1);
        }
    }
    const [ProductDetail, setProductDetail] = useState([initialState]);
    const { productID } = useParams()

    useEffect(() => {

        const fetchProductsDetail = async () => {

            await axios.get('http://34.92.49.138/ecommerce/fetchproductdetail.php', { params: { productID } }).then(res => {
                setProductDetail(res.data);
            }
            )

        };

        fetchProductsDetail();

    }, []);

    return (
        <div className="container mt-5 mb-5">
            <div className="card">

                <div className="row g-0">
                    <div className="col-md-6 border-end">
                        <div className="d-flex flex-column justify-content-center">
                            <div className="main_image"> <img src={"http://34.92.49.138/ecommerce/image/" + ProductDetail[0].picture} id="main_product_image" width="350" /> </div>

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="p-3 right-side">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3>{ProductDetail[0].name}</h3> <span className="heart"><i className='bx bx-heart'></i></span>
                            </div>
                            <div className="mt-2 pr-3 content">
                                <p>{ProductDetail[0].description}</p>
                            </div>
                            <div class="d-flex flex-row bd-highlight mb-3">
                            <Button type="button" size="small" onClick={() => decrement()}>-</Button>
                            <p>&nbsp;{quantity}&nbsp;</p>
                            <Button type="button" size="small" onClick={() => increment()}>+</Button>
                            </div>
                            <h3>RM {ProductDetail[0].price}</h3>
                           


                            <div className="buttons d-flex flex-row mt-5 gap-3"><button className="btn btn-dark" onClick={()=> handleAddToCart(ProductDetail[0].id,quantity)}>Add to Cart</button> </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
