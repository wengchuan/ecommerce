import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
function Banner(){
    return(
        <header className="masthead">
            <div className="container h-100">
                <div className="row h-100 align-items-center">
                <div className="col-12 text-center">
                    <h1 className="fw-light" >ABOUT US</h1>
                    <p className="lead">A Great Beauty Journey Start From Here</p>
                </div>
                </div>
            </div>
        </header>
    )
}


export default Banner;