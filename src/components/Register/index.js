import React, { useContext, useState } from 'react'
import { MyContext } from '../../context/MyContext.js'
import Swal from 'sweetalert2'

function Register() {
    const { toggleNav, registerUser } = useContext(MyContext);
    const initialState = {
        userInfo: {
            name: '',
            email: '',
            phone:'',
            password: '',
            cpassword:'',
            address:'',
            zip:'',
            city:'',
            state:'',

        },
        errorMsg: '',
        successMsg: '',
    }
    const [state, setState] = useState(initialState);

    // On Submit the Registration Form
    const submitForm = async (event) => {
        event.preventDefault();
        const data = await registerUser(state.userInfo);
        console.log(state.userInfo)
        if (data.success) {
            setState({
                ...initialState,
                successMsg: data.message,
            });
        }
        else {
            setState({
                ...state,
                successMsg: '',
                errorMsg: data.message
            });
        }
    }

    // On change the Input Value (name, email, password)
    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo: {
                ...state.userInfo,
                [e.target.name]: e.target.value
            }
        });
    }

    // Show Message on Success or Error
    let successMsg = '';
    let errorMsg = '';
    if (state.errorMsg) {
        errorMsg = <div className="error-msg">{state.errorMsg}</div>;
        Swal.fire({
            type: "error",
            title: 'Error',
            text: state.errorMsg,
          

        });

    }
    if (state.successMsg) {
        successMsg = <div className="success-msg">{state.successMsg}</div>;
        Swal.fire({
            title: 'Registered Account',
            text: state.successMsg,
            type: 'success',

        });
        
    }

    return (

        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                        <div className="card" style={{ borderRadius: "15px" }}>
                            <div className="card-body p-5">
                                <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                <form onSubmit={submitForm} >
                                    <div className="form-group mb-4">
                                        <label > Full Name</label>
                                        <input name="name"  type="text"  required className="form-control" value={state.userInfo.name} onChange={onChangeValue} placeholder="Enter your name" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label>Email</label>
                                        <input name="email" required type="email" className="form-control" value={state.userInfo.email} onChange={onChangeValue} placeholder="Enter your email" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label>Phone Number</label>
                                        <input name="phone" required type="text" className="form-control" value={state.userInfo.phone} onChange={onChangeValue} placeholder="Enter your Phone Number" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label>Password</label>
                                        <input name="password" required type="password" className="form-control" value={state.userInfo.password} onChange={onChangeValue} placeholder="Enter your Password" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label>Confirm Password</label>
                                        <input name="cpassword" required type="password" className="form-control" value={state.userInfo.cpassword} onChange={onChangeValue} placeholder="Enter your Password again" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label>Address</label>
                                        <textarea name="address" required type="text" className="form-control" value={state.userInfo.address} onChange={onChangeValue} placeholder="Enter your Address" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label>Zip Code</label>
                                        <input name="zip" required type="text" pattern="[0-9]{5}" className="form-control" value={state.userInfo.zip} onChange={onChangeValue} placeholder="Enter your Zip Code" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label>City</label>
                                        <input name="city" required type="text" className="form-control" value={state.userInfo.city} onChange={onChangeValue} placeholder="Enter your City" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label>State</label>
                                       
                                            <select className="form-select" required name="state" value={state.userInfo.state} onChange={onChangeValue}>
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
                                

                                    {errorMsg}
                                    {successMsg}
                                    <br />
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                    <br />




                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Register