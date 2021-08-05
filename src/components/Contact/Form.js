import React from 'react';
import "./style.css"

function Form(){
    return(
         <form className="form" >
        <p className="t"> For all enquiries, please email us using the form below.</p> 

        <label>Name</label> 
        <input placeholder="Name"  type="text" required/>

        <label> Email </label>
        <input placeholder="Email" type="email" required/>

        <label>Message</label>
        <textarea placeholder="Message" required></textarea>

        <button type="submit">Submit</button>
     </form>
    )
}

export default Form