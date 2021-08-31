import { CardMedia, Card, CardActions, CardContent, IconButton, Typography, Tooltip } from '@material-ui/core'

import React,{useState,useEffect,useRef} from 'react'
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from './AdminProduct-style'
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import Swal from 'sweetalert2'
function Product({ product, DeleteProduct,fetchProducts}) {
    const ref = useRef(null); 

    const [state, setState] = useState({});
    useEffect(()=>{
        setState(product)
    },[]);


  
    const onChangeValue = (e) => {
        setState({
            ...state,
         [e.target.name]: e.target.value
                
            
        });
        
    }
    
    const updateproduct = async (event) => {
        event.preventDefault();
        if (ref.current.files[0]==null){

            const fd = new FormData();
            fd.append('name', state.name);
            fd.append('price', state.price);
            fd.append('description', state.description);
            fd.append('quantity', state.quantity);
            fd.append('category', state.category);
            fd.append('id', state.id);
            
            const update = await axios.post('http://34.92.49.138/ecommerce/updateproduct.php',fd);
       
            if (update.data.success) {
                Swal.fire({
                    title: 'Product updated',
                    text: "Product updated",
                    type: 'success',
    
                });
                fetchProducts();
            }
            else {
                Swal.fire({
                    title: 'Failed',
                    text: "Failed to update Product",
                    type: 'error',
    
                });
            }
        }
        else{
          
            const fd = new FormData();
            fd.append('name', state.name);
            fd.append('price', state.price);
            fd.append('description', state.description);
            fd.append('picture', ref.current.files[0].name);
            fd.append('picture_file', ref.current.files[0]);
            fd.append('quantity', state.quantity);
            fd.append('category', state.category);
            fd.append('id', state.id);
            
            const update = await axios.post('http://34.92.49.138/ecommerce/updateproduct.php',fd);
       
            if (update.data.success) {
                Swal.fire({
                    title: 'Product updated',
                    text: "Product updated",
                    type: 'success',
    
                });
                fetchProducts();
            }
            else {
                Swal.fire({
                    title: 'Failed',
                    text: "Failed to update Product",
                    type: 'error',
    
                });
            }
        }
       
    }


    const classes = useStyles();
    return (
        <div className="row">
            <div className="col-lg-8 mx-auto">

                <ul className="list-group shadow">
 
                    <li className="list-group-item">

                        <div class="d-flex">
                            <div className="flex-shrink-0">
                                <img src={"http://34.92.49.138/ecommerce/image/" + product.picture} alt={product.name} width="200" className="ml-lg-5 order-1 order-lg-2" />

                            </div>
                            <div className="d-flex align-items-lg-center flex-row flex-lg-row p-3 w-75 p-3">

                                <div className="d-flex align-items-lg-center flex-row flex-lg-row p-3 w-75 p-3">
                                    <div className="media-body order-2 order-lg-1">
                                        <h5 className="mt-0 font-weight-bold mb-2">Product ID: {product.id}</h5>
                                        <div className="media-body order-2 order-lg-1">
                                            <h5 className="mt-0 font-weight-bold mb-2">Product Name: {product.name}</h5>

                                            <div className="d-flex align-items-center justify-content-between mt-1">
                                                <h6 className="font-weight-bold my-2">Quantity: {product.quantity}</h6>

                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-1">
                                                <h6 className="font-weight-bold my-2">Price: RM{product.price}</h6>

                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-1">
                                                <h6 className="font-weight-bold my-2">Category: {product.category}</h6>

                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-1">
                                                <h6 className="font-weight-bold my-2">Product Description: {product.description}</h6>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <Tooltip title="Delete Product">
                                    <IconButton onClick={() => DeleteProduct(product.id)} aria-label="Delete Product">
                                        <DeleteIcon ></DeleteIcon>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Edit Product Detail">
                                    <IconButton aria-label="Edit Product Detail" data-bs-toggle="modal" data-bs-target={"#id"+String(product.id)}>
                                        <EditIcon ></EditIcon>
                                    </IconButton>
                                </Tooltip>
                            </div>

                        </div>

                    </li>
                </ul>

            </div>
            <div>
                <div className="modal fade" id={"id"+String(product.id)} tabindex="-1" aria-labelledby="changeuserinfo" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="title">Update Product</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={updateproduct} >
                                    <div className="mb-3">
                                        <label > Product Name </label>
                                       
                                        <input name="name" type="text" required className="form-control" value={state.name} onChange={onChangeValue} placeholder="Enter Product Name" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Price: </label>
                                        <input name="price" required type="type" className="form-control" value={state.price} onChange={onChangeValue} placeholder="Enter Product Price" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Quantity: </label>
                                        <input name="quantity" required type="type" className="form-control" value={state.quantity} onChange={onChangeValue} placeholder="Enter Product Quantity" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Category:</label>
                                        <input name="category" required type="text" className="form-control" value={state.category} onChange={onChangeValue} placeholder="Enter Product Category" />
                                    </div>
                                    <div className=" mb-3">
                                        <label>Product Description</label>
                                        <textarea name="description" required type="text" className="form-control" value={state.description} onChange={onChangeValue} placeholder="Enter Product Description " />
                                    </div>
                                    <div className="mb-3">
                                        <label for="product_picture" className="col-form-label">Product Picture:</label>
                                        <input type="file" className="form-control" id="product_picture" accept=".jpg,.jpeg,.png" ref={ref} />
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                                        <button type="submit" className="btn btn-primary">Change</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Product
