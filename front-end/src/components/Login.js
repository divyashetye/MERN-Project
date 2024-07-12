import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');          //to avoid login url on browser w/o logging out
        if(auth){
          navigate('/');
        }
      },[])

    const handleLogin=async()=>{
        let result=await fetch("http://localhost:5000/login",{      //giving nodejs post url
        method:"post",
        body:JSON.stringify({email, password}),
        headers:{'Content-Type':'application/json'}
       });
       result=await result.json();
       console.log(result);

       if(result.name){
        localStorage.setItem('user',JSON.stringify(result));
        navigate('/');
       }
       else{
        alert("Incorrect details")
       }
    }

    return(
        <div className='login'>
        <h1>Login</h1>
          <input className='inputBox' type='text' placeholder='Enter Email'
          value={email} onChange={(e)=>setEmail(e.target.value)}/>

          <input className='inputBox' type='password' placeholder='Enter Password'
          value={password} onChange={(e)=>setPassword(e.target.value)}/>

          <button onClick={handleLogin} className='appButton' type='button'>Sign Up</button>
        </div>
    )
}

export default Login;