import React, {useContext} from 'react'
import { MyContext } from '../../context/MyContext.js'

// Importing the Login & Register Componet
import Login from '../SignIn'
import './style.css'


function UserProfile(){

    const {rootState,logoutUser} = useContext(MyContext);
    const {isAuth,theUser,showLogin} = rootState;

    // If user Logged in
    if(isAuth)
    {
        return(
            <div className="userInfo">
                <div className="_img"><span role="img" aria-label="User Image">👦</span></div>
                <h1>{theUser.user_name}</h1>
                <div className="_email"><span>{theUser.user_email}</span></div>
                <button onClick={logoutUser}>Logout</button>
            </div>
        )
    }
    // Showing Login Or Register Page According to the condition
    else if(showLogin){
        return <Login/>;
    }

    
}

export default UserProfile;