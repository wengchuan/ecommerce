import React, { useState, useRef,useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import AdminListProduct from'./AdminListProduct'
function ManageProduct() {
    const [product, setProducts] = useState([]);
    const [update,setUpdate]=useState([]);
    const fetchProducts = async () => {

        axios.get('http://192.168.0.249/ecommerce/fetchproduct.php').then(res => {
            setProducts(res.data);
            setUpdate(res.data);
        }
        )

    };
    useEffect(() => {

        fetchProducts();

    }, []);


    const ref = useRef(null);
    const initialState = {
        productInfo: {
            name: '',
            price: '',
            description: '',
            picture: '',
            quantity: '',
            category: '',
        },

    }

    const [state, setState] = useState(initialState);


 


    const addProduct = async (event) => {

        event.preventDefault();
        const fd = new FormData();
        fd.append('name', state.productInfo.name);
        fd.append('price', state.productInfo.price);
        fd.append('description', state.productInfo.description);
        fd.append('picture', ref.current.files[0].name);
        fd.append('picture_file', ref.current.files[0]);
        fd.append('quantity', state.productInfo.quantity);
        fd.append('category', state.productInfo.category);
       


        axios.post('http://192.168.0.249/ecommerce/addproduct.php', fd
        ).then(res => {
          
            //Success alert
            Swal.fire({
                title: 'Added Product',
                text: res.data.data,
                type: 'success',

            });
            fetchProducts();
            resetForm();
        }
        );
    }
    const resetForm = () => {
        setState(initialState);
        ref.current.value = "";

    }

    return (
        <div>
            <center> <h1>Manage Product</h1> </center>



            {/* popup button  */}
            <div>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductForm">
                    Add Product</button>
            <br/>
            
            <AdminListProduct product={product} fetchProducts={fetchProducts} />

            {/* popup page/modal*/}
                <div className="modal fade" id="addProductForm" tabindex="-1" aria-labelledby="addProductForm" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="title">Add New Product</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={addProduct}>
                                    <div className="mb-3">
                                        <label for="product_name" className="col-form-label">Product Name:</label>
                                        <input type="text" className="form-control" id="name" name="name"required value={state.productInfo.name} onChange={(event) => {
                                            setState({
                                                ...state,
                                                productInfo: {
                                                    ...state.productInfo,
                                                    name: event.target.value
                                                }

                                            });

                                        }} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="product_price" className="col-form-label">Product Price:</label>
                                        <input type="text" className="form-control" id="product_price"required name="price" onChange={(event) => {
                                            setState({
                                                ...state,
                                                productInfo: {
                                                    ...state.productInfo,
                                                    price: event.target.value
                                                }

                                            });

                                        }} value={state.productInfo.price} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="product_quantity" className="col-form-label">Product Quantity:</label>
                                        <input type="text" className="form-control" id="product_quantity"required name="quantity" onChange={(event) => {
                                            setState({
                                                ...state,
                                                productInfo: {
                                                    ...state.productInfo,
                                                    quantity: event.target.value
                                                }

                                            });

                                        }} value={state.productInfo.quantity} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="product_picture" className="col-form-label">Product Picture:</label>
                                        <input type="file" className="form-control" id="product_picture"required accept=".jpg,.jpeg,.png"  ref={ref} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="product_category" className="col-form-label">Product Category:</label>
                                        <input type="text" className="form-control" id="product_category" required name="category" onChange={(event) => {
                                            setState({
                                                ...state,
                                                productInfo: {
                                                    ...state.productInfo,
                                                    category: event.target.value
                                                }

                                            });

                                        }} value={state.productInfo.category} />
                                    </div>

                                    <div className="mb-3">
                                        <label for="product_description" className="col-form-label">Product Description:</label>
                                        <textarea className="form-control" id="product_description" required name="description" onChange={(event) => {
                                            setState({
                                                ...state,
                                                productInfo: {
                                                    ...state.productInfo,
                                                    description: event.target.value
                                                }

                                            });

                                        }} value={state.productInfo.description}></textarea>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetForm}>Close</button>
                                        <button type="submit" className="btn btn-primary">Add</button>
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

export default ManageProduct
