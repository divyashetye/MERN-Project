import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

const PrivateComponent= () =>{                    //similar to auth service
     const auth = localStorage.getItem('user');
     return auth ?<Outlet/>:<Navigate to="signup"/>    //ternary operator(?:)
}
               //Outlet - components within PrivateComponent in App.js

export default PrivateComponent;