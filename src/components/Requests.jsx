import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Requests = () => {
 
    const dispatch=useDispatch();
    const requests= useSelector((store)=>store.request);
    console.log(requests);
    const reviewRequest=async(status, _id)=>{

        try{
            const res= await axios.post("http://localhost:3000" + "/request/review/" + status + '/' + _id, {}, {withCredentials:true});
        console.log(res);
        dispatch(removeRequest(_id))
        }
        catch(err){
            console.error(err);

        }
    }

    const fetchRequests=async ()=>{
        try{
            const res= await axios.get("http://localhost:3000/user/requests/received", {withCredentials:true});
            console.log(res);
            dispatch(addRequest(res.data.data))
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(()=> { 
        fetchRequests();
    }, []);
    

    if(!requests) return;
    if(requests.length===0)  return(<h1 className="flex flex-col justify-center items-center" > No Requests</h1>);
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold m-5"> Requests </h1>
           
         
           {requests.map((request)=>{
                const {_id, firstName, lastName, gender, about, photoUrl}=request.fromUserId;
                return(
                    <div className="flex items-center justify-between w-1/2 bg-base-300 m-2 gap-3">
                        <div className="flex items-center">
                        <div>
                            <img src={photoUrl} alt="Photo" className="w-20 h-20 rounded-full m-4"/>
                        </div>
                        <div>
                     <p className='font-bold text-lg'>{firstName+ " "+ lastName}</p>
                     <p>Gender: {gender}</p>
                     <p>{about}</p>
                        </div>
                        </div>
                       
                        <div>
                        <button className="btn btn-active btn-primary mx-3" onClick={()=>reviewRequest("rejected", request._id )}>Reject</button>
                        <button className="btn btn-active btn-secondary mx-3" onClick={()=>reviewRequest("accepted", request._id )}>Accept</button>
                        </div>
                    </div>
                )
            })}

        
    
        
        </div>
      )
    }

export default Requests;