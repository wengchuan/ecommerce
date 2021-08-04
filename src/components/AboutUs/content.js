import React from "react";
import { Link } from "react-router-dom";

function Content(){
    return(
    <section className="py-5">
        <div className="container">
            <h2 className="fw-border text-center">WHY BEAUTY STORE</h2>
            <p className="lead">The Beauty Store is a e-commerce website that selling the beauty products thru the internet.We providing customers 
            with an easy, secure, and fast online shopping experience.
             We believe online shopping should be accessible, easy, and enjoyable during this pandemic. This is the vision The Beauty Store to deliver on this platform.</p>
        </div>
        <div className="d-flex justify-content-center m-2">
            <Link to="/">
            <button className="m-2 p-2">
                Explore More
            </button>
            </Link>
        </div>
    </section>
    );
}
export default Content;