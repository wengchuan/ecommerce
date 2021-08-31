import { CardMedia, Card, CardActions, CardContent, IconButton, Typography, Tooltip } from '@material-ui/core'

import React,{useState,useEffect,useRef} from 'react'
import DeleteIcon from '@material-ui/icons/Delete';

import useStyles from './AdminProduct-style'
import axios from 'axios';
import Swal from 'sweetalert2'
function Product({ user, DeleteUser,fetchUser}) {

    const [state, setState] = useState({});
    useEffect(()=>{
        setState(user)
    },[]);


  
    const onChangeValue = (e) => {
        setState({
            ...state,
         [e.target.name]: e.target.value
                
            
        });
        
    }
   
    const updateuser = async (event) => {
        event.preventDefault();
       

            const fd = new FormData();
            console.log( state.password)
            fd.append('password', state.password);
            fd.append('uid', user.uid);
            
            const update = await axios.post('http://34.92.49.138/ecommerce/updateuser.php',fd);
       
            if (update.data.success) {
                Swal.fire({
                    title: 'User password changed',
                    text: "User password changed",
                    type: 'success',
    
                });
                fetchUser();
            }
            else {
                Swal.fire({
                    title: 'Failed',
                    text: "Failed to change user password",
                    type: 'error',
    
                });
            }
        

       
    }


    const classes = useStyles();
    return (
        <div className="row">
            <div className="col-lg-8 mx-auto">

                <ul className="list-group shadow">
 
                    <li className="list-group-item">

                        <div class="d-flex">
                            <div className="d-flex align-items-lg-center flex-row flex-lg-row p-3 w-75 p-3">

                                <div className="d-flex align-items-lg-center flex-row flex-lg-row p-3 w-75 p-3">
                                    <div className="media-body order-2 order-lg-1">
                                        <h5 className="mt-0 font-weight-bold mb-2">User ID: {user.uid}</h5>
                                        <div className="media-body order-2 order-lg-1">
                                            <h5 className="mt-0 font-weight-bold mb-2">User Name: {user.user_name}</h5>

                                            <div className="d-flex align-items-center justify-content-between mt-1">
                                                <h6 className="font-weight-bold my-2">User Email: {user.user_email}</h6>

                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-1">
                                                <h6 className="font-weight-bold my-2">User Phone: {user.user_phone}</h6>

                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-1">
                                                <h6 className="font-weight-bold my-2">User Address: {user.user_address}</h6>

                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-1">
                                                <h6 className="font-weight-bold my-2">User Zip: {user.user_zip}</h6>

                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-1">
                                                <h6 className="font-weight-bold my-2">User City: {user.user_city}</h6>

                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-1">
                                                <h6 className="font-weight-bold my-2">User State: {user.user_state}</h6>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <Tooltip title="Delete User">
                                    <IconButton onClick={() => DeleteUser(user.uid)} aria-label="Delete user">
                                        <DeleteIcon ></DeleteIcon>
                                    </IconButton>
                                </Tooltip>

                                
                                    <button className="btn btn-primary" aria-label="Edit Product Detail" data-bs-toggle="modal" data-bs-target={"#id"+String(user.uid)}>
                                        Change user password
                                    </button>
                                
                            </div>

                        </div>

                    </li>
                </ul>

            </div>
            <div>
                <div className="modal fade" id={"id"+String(user.uid)} tabindex="-1" aria-labelledby="changeuserinfo" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="title">Change user password</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={updateuser} >
                                    <div className="mb-3">
                                        <label > User Password </label>
                                       
                                        <input name="password" type="password" required className="form-control" onChange={onChangeValue} placeholder="Enter New User Password" />
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
