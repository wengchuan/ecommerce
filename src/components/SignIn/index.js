import axios from 'axios'
import React, {useContext ,useState } from 'react'
import './style.css'
import { MyContext } from '../../context/MyContext.js'
import { BrowserRouter as Router, Redirect } from 'react-router-dom';



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
                    <form onSubmit={signinSubmit}>
                        <div className="form-group">
                            <label for="login_email">Email address</label>
                            <input name="email" type="email" required className="form-control" onChange={handleInput} value={state.userInfo.email} id="login_email" aria-describedby="emailHelp" placeholder="Enter email" />

                        </div>
                        <div className="form-group">
                            <label for="InputPassword">Password</label>
                            <input name="password" type="password" required className="form-control" onChange={handleInput} value={state.userInfo.password} id="InputPassword" placeholder="Password" />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" for="exampleCheck1">Remember me </label>
                        </div>
                        {errorMsg}
                        {successMsg}
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <div className="form-group">
                            <small>Forget Password</small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
