import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'


const Connections = () => {

     const dispatch=useDispatch(); 
     const connection = useSelector(state=>state.connection);
     console.log(connection);
    //  const{firstName, lastName } = connection[0];

     

    const fetchConnections = async()=>{
        const res= await axios.get(BASE_URL+"/user/connection",{
            withCredentials:true
        });
   
        dispatch(addConnection(res.data));        
    }

    useEffect(()=>{
      fetchConnections();
    },[])
  return (
    <div>
    <div className='font-bold text-3xl justify-center flex my-10 '>
    Connections
    </div>
   { connection &&  connection.map((k)=>{
        const {firstName, lastName, photoUrl, age, gender, about }=k;
        return (<div className='flex justify-center'>
           
           <div className="card bg-base-200 w-1/3 h-28 m-2 shadow-xl flex flex-row items-center p-4">
 
          <div className="w-20 h-20 rounded-full border overflow-hidden flex-shrink-0">
          <img src={photoUrl} alt="" className="w-full h-full object-cover" />
          </div>

 
           <div className="ml-4 flex flex-col justify-center">
           <div className="text-lg font-semibold">{firstName + " " + lastName}</div>
           <div className="text-sm text-gray-600">{age && gender && `${age}, ${gender}`}</div>
           <div className="text-sm">{about}</div>
            </div>
       </div>
        </div>)
    })}
    </div>
  )
}

export default Connections
