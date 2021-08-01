import React, { createContext,Component } from "react";
import axios from 'axios'
export const MyContext = createContext();

// Define the base URL
const Axios = axios.create({
    baseURL: 'http://localhost/ecommerce/php-login-registration-api/',
});

class MyContextProvider extends Component{
    constructor(){
        super();
        this.isLoggedIn();
        this.isLoggedIn=this.isLoggedIn.bind(this);
    }

    // Root State
    state = {
        showLogin:true,
        isAuth:false,
        theUser:null,
    }
    
    // Toggle between Login & Signup page
    toggleNav = () => {
        const showLogin = !this.state.showLogin;
        this.setState({
            ...this.state,
            showLogin
        })
    }

    // On Click the Log out button
    logoutUser = () => {
        localStorage.removeItem('loginToken');
        this.setState({
            ...this.state,
            isAuth:false
        })
    }

    registerUser = async (user) => {

        // Sending the user registration request
        const register = await Axios.post('register.php',{
            name:user.name,
            email:user.email,
            password:user.password 
        });

        return register.data;
    }


    loginUser = async (user) => {

        // Sending the user Login request
        const login = await Axios.post('login.php',{
            email:user.email,
            password:user.password
        });
        
        return login.data;
    }

    // Checking user logged in or not
    isLoggedIn = async () => {
        console.log("asdasd")
        const loginToken = localStorage.getItem('loginToken');
        
        // If inside the local-storage has the JWT token
        if(loginToken){
            console.log("token")
            //Adding JWT token to axios default header
            Axios.defaults.headers.common['Authorization'] = 'bearer '+loginToken;
            console.log("123")
            // Fetching the user information
            const {data} = await Axios.get('user-info.php');
           
            var str = JSON.stringify(data);
            console.log("data:"+str)
            // If user information is successfully received
            if(data.success && data.user){
                console.log("asdasd1`23")
                this.setState({
                    ...this.state,
                    isAuth:true,
                    theUser:data.user
                });
                
            }

        }
    }

    render(){
        const contextValue = {
            rootState:this.state,
            toggleNav:this.toggleNav,
            isLoggedIn:this.isLoggedIn,
            registerUser:this.registerUser,
            loginUser:this.loginUser,
            logoutUser:this.logoutUser
        }
        return(
            <MyContext.Provider value={contextValue}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}

export default MyContextProvider;