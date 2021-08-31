import { Grid } from '@material-ui/core'
import React, { useState, useEffect,useRef } from 'react'
import AdminUser from './AdminUser'
import axios from 'axios';
import Swal from 'sweetalert2'
const UserList = ({user,fetchUser}) => {
 
    
    const DeleteUser = async (userID) => { 
     
        Swal.fire({
            title: 'Do you want to Delete User?',
            showDenyButton: true,
           
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
          }).then( async (result) => {
            if (result.value) {
                const deleteUser =  await axios.get('http://192.168.0.249/ecommerce/deleteuser.php', {
                    params: {
          
                      uid: userID
                    }
                  })
                  if(deleteUser.data.success){
                      Swal.fire({
                          title: 'User deleted',
                          text: deleteUser.data.message,
                          type: 'success',
          
                      });
                      fetchUser();
                  }
                  else{
                      Swal.fire({
                          title: 'Failed',
                          text:  deleteUser.data.message,
                          type: 'error',
          
                      });
                  }
      
            } 
          })

        
     
          
    
          }
    
        
    

    return (

        <main>
            <Grid container spacing={3}>
                {user.map((user) => (
                    <Grid key={user.uid} item xs={12} >
                        
                        <AdminUser  user={user} DeleteUser={DeleteUser} fetchUser={fetchUser} />
                    </Grid>))}

            </Grid>
        </main>

    )
}


export default UserList
