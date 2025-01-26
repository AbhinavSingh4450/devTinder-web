import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const Login = () => {
  const navigate=useNavigate();
  
  const dispatch=useDispatch();

  const [emailId, setEmailId]=useState("Singh@gmail.com");
  const [password, setPassword]=useState("Singh@123");
  const [error, setError] = useState();

  const handleClick= async ()=>{
    try{
      const res = await axios.post( "http://localhost:3000/login",{
        emailId,
        password
      },{withCredentials:true})
      dispatch(addUser(res.data));
      return navigate('/');
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong");
    }

  }
  return (
  <div className='flex justify-center my-10'>  
  <div className="card bg-base-200 w-96 shadow-xl">
  <div className="card-body flex align-middle justify-center">
  <div  className='flex justify-center'><div className="text-white">Login</div></div>
  <label className="form-control w-full max-w-xs">
  <div className="label">
  <span className="label-text">Email ID</span>
  </div>
  <input type="text"
         className="input input-bordered w-full max-w-xs"
         value={emailId}
         onChange={(e)=>setEmailId(e.target.value)}
          />
  </label>
  <label className="form-control w-full max-w-xs">
  <div className="label">
  <span className="label-text">Password</span>
  </div>
  <input type="text"
         value={password}
         onChange={(e)=>setPassword(e.target.value)}
         className="input input-bordered w-full max-w-xs" />
  </label>
  <p className='text-red-500'> {error} </p>
    <div className="card-actions justify-center my-3">
      <button className="btn btn-primary"
              onClick={handleClick}>Login</button>
    </div>
  </div>
</div>
</div>
  )
}

export default Login
