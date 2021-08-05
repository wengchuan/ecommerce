import React from 'react';

function Detail(){
    const address = "NO 74E, Jalan Dato Sagor,33000,Kuala Kangsar,Perak";
    const phone = "05-7767537";
    const hp = "016-3737788";

    return(
        <div>
            <h1>Contact Us</h1>
            <table>
            <tbody>
                <tr>
                   <td> <p><b>Address  </b></p></td>
                   <td> <p>{address} </p> </td>
                </tr>
                <tr>
                   <td><p><b>No.Tel  </b></p></td>
                    <td> <p>{phone}</p> </td>
                </tr>
                <tr>
                   <td><p><b>No H/P </b>  </p></td>
                   <td> <p>{hp}</p></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Detail