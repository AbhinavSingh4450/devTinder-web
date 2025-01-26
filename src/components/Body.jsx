import React, { useEffect } from 'react'
import NavBar from './NavBar'
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useSelector } from 'react-redux'

const Body = () => {
  const userData= useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate= useNavigate();
   
  const fetchUser = async ()=>{
    if(userData) return;
    try{
    const res=  await axios.get("http://localhost:3000/profile/view",{withCredentials:true})
    dispatch(addUser(res.data));
  }

catch(err){
  if(err.status==401){
    navigate("/login");
  }
  console.error(err);
}
  }


  useEffect(()=>{
   
      fetchUser();
  
 
  },[]);



  
  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
      
    </div>
  )
}

export default Body
