import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';

const Card = ({user}) => {
    const {_id, firstName, lastName, photoUrl, skills, about, age, gender }= user;
    const dispatch=useDispatch();

    const handleSendRequest=async(status, userId)=>{
      try{
        const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
           {},
           {withCredentials:true}
          );
      dispatch(removeUserFromFeed(userId));
      }
      catch(err){
       console.log(err);
      }
     

    }
  return (
    <div className="card bg-base-200 w-96 shadow-xl mt-[-8px] ">
    <figure>
      <img
       className='w-full object-cover'
        src={photoUrl}
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName+ " "+ lastName}</h2>
      <p>{age + ", " + gender}</p>
      <p>{skills}</p>
      <p>{about}</p>
      <div className="card-actions  my-4 mx-4 flex justify-center">
        <button className="btn btn-primary " onClick={()=> handleSendRequest("ignore", _id)}>Ignore</button>
        <button className="btn btn-secondary "  onClick={()=> handleSendRequest("interested", _id)}  >Interested</button>
      </div>
    </div>
  </div>
  )
}

export default Card
