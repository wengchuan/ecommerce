import React, { useState, useRef,useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'

import { withRouter } from 'react-router';
import UserList from './UserList';
function ManageProduct() {
    const [user, setUser] = useState([]);
    const [update,setUpdate]=useState([]);
    const [state, setState] = useState({});
    
    const fetchUser = async () => {

        axios.get('http://192.168.0.249/ecommerce/fetchuser.php').then(res => {
            setUser(res.data);
            setUpdate(res.data);
        }
        )

    };
    useEffect(() => {

        fetchUser();

    }, []);


   




 


    // const addProduct = async (event) => {

    //     event.preventDefault();
    //     const fd = new FormData();
    //     fd.append('name', state.productInfo.name);
    //     fd.append('price', state.productInfo.price);
    //     fd.append('description', state.productInfo.description);
    //     fd.append('picture', ref.current.files[0].name);
    //     fd.append('picture_file', ref.current.files[0]);
    //     fd.append('quantity', state.productInfo.quantity);
    //     fd.append('category', state.productInfo.category);
       


    //     axios.post('http://192.168.0.249/ecommerce/addproduct.php', fd
    //     ).then(res => {
          
    //         //Success alert
    //         Swal.fire({
    //             title: 'Added Product',
    //             text: res.data.data,
    //             type: 'success',

    //         });
    //         fetchProducts();
    //         resetForm();
    //     }
    //     );
    // }
    // const resetForm = () => {
    //     setState(initialState);
    //     ref.current.value = "";

    // }

    return (
        <div>
            <center> <h1>Manage User</h1> </center>



            {/* popup button  */}
            <div>
               
            <br/>
            </div>
            <UserList user={user} fetchUser={fetchUser} />

         
        </div>
    )
}

export default withRouter(ManageProduct)
