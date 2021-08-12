import axios from 'axios'
import React, { useContext, useState } from 'react'
import './style.css'
import { MyContext } from '../../context/MyContext.js'
import { BrowserRouter as Router, Redirect,Link } from 'react-router-dom';



function SignIn() {

    const { loginUser, isLoggedIn } = useContext(MyContext);

    const initialState = {
        userInfo: {
            email: '',
            password: '',
        },
        errorMsg: '',
        successMsg: '',
    }

    const [state, setState] = useState(initialState);

    // On change input value (email & password)
    const handleInput = (e) => {
        setState({
            ...state,
            userInfo: {
                ...state.userInfo,
                [e.target.name]: e.target.value
            }
        });
    }

    // On Submit Login From
    const signinSubmit = async (event) => {
        event.preventDefault();
        const data = await loginUser(state.userInfo);
        if (data.success && data.token) {

            setState({
                ...initialState,
                successMsg: data.message
            });
            localStorage.setItem('loginToken', data.token);
            await isLoggedIn();



        }
        else {

            setState({
                ...state,
                successMsg: '',
                errorMsg: data.message

            });
        }
    }

    // Show Message on Error or Success
    let successMsg = '';
    let errorMsg = '';
    if (state.errorMsg) {
        errorMsg = <div className="error-msg">{state.errorMsg}</div>;
    }
    if (state.successMsg) {
        successMsg = <div className="success-msg">{state.successMsg}</div>;
    }


    return (
        <div className="back">


            <div className="div-center">


                <div className="content">
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login </p>
                    <form onSubmit={signinSubmit}>
                        <div className="form-group">
                            <label for="login_email">Email address</label>
                            <input name="email" type="email" required className="form-control" onChange={handleInput} value={state.userInfo.email} id="login_email" aria-describedby="emailHelp" placeholder="Enter email" />

                        </div>
                        <div className="form-group">
                            <label for="InputPassword">Password</label>
                            <input name="password" type="password" required className="form-control" onChange={handleInput} value={state.userInfo.password} id="InputPassword" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <small>Forget Password</small>
                        </div>
                        {errorMsg}
                        {successMsg}
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        <br/>
                        
                        <div className="text-center">
                        <Link className="link-primary" exact to="/Register" style={{color:"grey" }}>
                            <p>SIGN UP NOW</p>
                            </Link>
                        </div>
                      

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
