import React, { createContext,Component } from "react";
import axios from 'axios'
export const MyContext = createContext();

// Define the base URL
const Axios = axios.create({
    baseURL: 'http://34.92.49.138/ecommerce/php-login-registration-api/',
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
        theUser:{
            uid:null,
            user_name:null,
            user_email:null,
            user_role:"guest",
        },
        
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
            isAuth:false,
            theUser:{
                user_name:null,
                user_email:null,
                user_role:"guest",
            },
            
        })
    }

    registerUser = async (user) => {

        // Sending the user registration request
        const register = await Axios.post('register.php',{
            name:user.name,
            email:user.email,
            phone:user.phone,
            password:user.password,
            cpassword:user.cpassword,
            address:user.address,
            zip:user.zip,
            city:user.city,
            state:user.state,
           
        });

        return register.data;
    }

    AddCart = async (userID,productID,cart_quantity) => {

        
        // Sending the user registration request
        const add = await Axios.post('http://34.92.49.138/ecommerce/addtocart.php',{
            uid:userID,
            pid:productID,
            cart_quantity:cart_quantity
        });

        return add.data;
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
     
        const loginToken = localStorage.getItem('loginToken');
        
        // If inside the local-storage has the JWT token
        if(loginToken){
            
            //Adding JWT token to axios default header
            Axios.defaults.headers.common['Authorization'] = 'bearer '+loginToken;
           
            // Fetching the user information
            const {data} = await Axios.get('user-info.php');
           
           
          
            // If user information is successfully received
            if(data.success && data.user){
                
                this.setState({
                    ...this.state,
                    isAuth:true,
                    theUser:data.user
                });
                
            }

        }
        else{
            this.setState({
            isAuth:false,
            })
        }
    }

  
    render(){
        const contextValue = {
            rootState:this.state,
            toggleNav:this.toggleNav,
            isLoggedIn:this.isLoggedIn,
            registerUser:this.registerUser,
            loginUser:this.loginUser,
            logoutUser:this.logoutUser,
            AddCart:this.AddCart
        }
        return(
            <MyContext.Provider value={contextValue}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}

export default MyContextProvider;