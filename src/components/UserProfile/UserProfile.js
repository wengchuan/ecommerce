import React, { useContext, useState, useEffect } from 'react'
import { MyContext } from '../../context/MyContext.js'
import axios from 'axios';
// Importing the Login & Register Componet
import Login from '../SignIn'
import './style.css'
import Swal from 'sweetalert2'


function UserProfile() {

    const { rootState, logoutUser } = useContext(MyContext);
    const { isAuth, theUser, showLogin } = rootState;

    const [userinfo, setUser] = useState([]); 
    const [state, setState] = useState({});


    // On Submit the Registration Form
        const updateinfo = async (event) => {
            event.preventDefault();
           
           
            const update = await axios.post('http://192.168.0.249/ecommerce/updateuserinfo.php',{
                name:state.user_name,
                email:state.user_email,
                phone:state.user_phone,
                address:state.user_address,
                zip:state.user_zip,
                city:state.user_city,
                state:state.user_state,
               
            });
            console.log(update.data)
            // if (data.success) {
            //     Swal.fire({
            //         title: 'Profile updated',
            //         text: "Profile updated",
            //         type: 'success',
    
            //     });
            // }
            // else {
            //     Swal.fire({
            //         title: 'Failed',
            //         text: "Failed to update profile",
            //         type: 'error',
    
            //     });
            // }
        }


        const onChangeValue = (e) => {
            setState({
                ...state,
             [e.target.name]: e.target.value
                    
                
            });
            
        }
        
    const fectuserinfo = async () => {
    
        const loginToken = localStorage.getItem('loginToken');
        const Axios = axios.create({
            baseURL: 'http://localhost/ecommerce/php-login-registration-api/',
        });
        // If inside the local-storage has the JWT token
        if (loginToken) {

            //Adding JWT token to axios default header
            Axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

            // Fetching the user information
            const { data } = await Axios.get('user-info.php');



            // If user information is successfully received
            if (data.success && data.user) {

                setUser(data.user);
                setState(data.user);

            }
        }
    }
    useEffect(() => {

        fectuserinfo();
    }, []);



    // If user Logged in
    if (isAuth) {
        return (
            <>
                <div className="userInfo">
                    <div className="d-flex align-items-start">


                        <div className="d-flex flex-column bd-highlight mb-3 ms-3">
                            <h1>My Account </h1>
                            <div className=" d-flex flex-column bd-highlight mt-5 text-start  justify-content-around">
                                <h2>  User Information </h2>
                                <div className=" d-flex flex-row"> <p className="text-muted ">Full Name :</p> <p>{userinfo.user_name} </p> </div>
                                <div className=" d-flex flex-row"> <p className="text-muted ">Email:</p> <p> {userinfo.user_email}</p>   </div>
                                <div className=" d-flex flex-row "> <p className="text-muted ">Address:</p> <p> {userinfo.user_address}</p>   </div>
                                <div className=" d-flex flex-row"> <p className="text-muted ">City:</p> <p> {userinfo.user_city}</p>   </div>
                                <div className=" d-flex flex-row "> <p className="text-muted ">Zip Code:</p> <p> {userinfo.user_zip}</p>   </div>
                                <div className=" d-flex flex-row "> <p className="text-muted ">State: </p> <p>{userinfo.user_state}</p>   </div>
                                <button type="button" className="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#changeuserinfo">Change </button>

                            </div>
                        </div>
                    </div>


                    <button type="button" className="btn btn-danger" onClick={logoutUser}>Logout</button>
                </div>

                {/* popup window */}
                <div>


                    <div className="modal fade" id="changeuserinfo" tabindex="-1" aria-labelledby="changeuserinfo" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="title">User Information</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={updateinfo} >
                                        <div className="mb-3">
                                            <label > Full Name</label>
                                            <input name="user_name" type="text" required className="form-control" value={state.user_name} onChange={onChangeValue} />
                                        </div>
                                        <div className="mb-3">
                                            <label>Email</label>
                                            <input name="user_email" required type="email" className="form-control" value={state.user_email} onChange={onChangeValue} placeholder="Enter your email" />
                                        </div>
                                        <div className="mb-3">
                                            <label>Phone Number</label>
                                            <input name="user_phone" required type="text" className="form-control" value={state.user_phone} onChange={onChangeValue} placeholder="Enter your Phone Number" />
                                        </div>
                                        <div className=" mb-3">
                                            <label>Address</label>
                                            <textarea name="user_address" required type="text" className="form-control" value={state.user_address} onChange={onChangeValue} placeholder="Enter your Address" />
                                        </div>
                                        <div className=" mb-3">
                                            <label>Zip Code</label>
                                            <input name="user_zip" required type="text" pattern="[0-9]{5}" className="form-control" value={state.user_zip} onChange={onChangeValue} placeholder="Enter your Zip Code" />
                                        </div>
                                        <div className=" mb-3">
                                            <label>City</label>
                                            <input name="user_city" required type="text" className="form-control" value={state.user_city} onChange={onChangeValue} placeholder="Enter your City" />
                                        </div>
                                        <div className=" mb-3">
                                            <label>State</label>

                                            <select className="form-select" required name="user_state" value={state.user_state} onChange={onChangeValue}>
                                                <option selected disabled value="">Select the state</option>
                                                <option value="Johor">Johor</option>
                                                <option value="Kedah">Kedah</option>
                                                <option value="Kelantan">Kelantan</option>
                                                <option value="Kuala Lumpur">Kuala Lumpur</option>
                                                <option value="Labuan">Labuan</option>
                                                <option value="Melaka">Melaka</option>
                                                <option value="Negeri Sembilan">Negeri Sembilan</option>
                                                <option value="Pahang">Pahang</option>
                                                <option value="Penang">Penang</option>
                                                <option value="Perak">Perak</option>
                                                <option value="Perlis">Perlis</option>
                                                <option value="Putrajaya">Putrajaya</option>
                                                <option value="Sabah">Sabah</option>
                                                <option value="Sarawak">Sarawak</option>
                                                <option value="Selangor">Selangor</option>
                                                <option value="Terengganu">Terengganu</option>
                                            </select>

                                        </div>

                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                                            <button type="submit" className="btn btn-primary">Add</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>



        )
    }
    // Showing Login Or Register Page According to the condition
    else if (showLogin) {
        return <Login />;
    }


}

export default UserProfile;