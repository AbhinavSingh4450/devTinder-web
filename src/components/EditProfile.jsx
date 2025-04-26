import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Card from './Card';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';

const EditProfile = ({user}) => {

    console.log(user);
    const [error, setError]=useState();
    const [firstName, setFirstName]=useState(user.firstName);
    const [lastName, setlastName]=useState(user.lastName);
    const [age, setAge]=useState(user.age || "");
    const [photoUrl, setPhotoUrl]=useState(user.photoUrl);
    const [gender, setGender]=useState(user.gender || "");
    const [about, setAbout]=useState(user.about|| "");
    const dispatch = useDispatch();
    const [showToast,setShowToast]=useState(false);

    const saveProfile = async ()=>{
        try {const res= await axios.put(
        "http://localhost:3000/profile/edit",
        {firstName,
         lastName,
         age,
         photoUrl,
         gender,
         about,
        },
        {withCredentials:true}
       );
       dispatch(addUser(res?.data?.data));
       setShowToast(true);
       setTimeout(()=>{
              setShowToast(false)
       },3000);
    
    }
       catch(err){
        setError(err.message);
       }

    }

  return (

  <div className='flex justify-center my-10 '>
        <div className='flex justify-center mx-10'>  
    <div className="card bg-base-200 w-96 shadow-xl">
    <div className="card-body flex align-middle justify-center">
    <div  className='flex justify-center'><div className="text-white">Edit Profile</div></div>
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">First Name</span>
    </div>
    <input type="text"
           className="input input-bordered w-full max-w-xs"
           value={firstName}
           onChange={(e)=>setFirstName(e.target.value)}
            />
    </label>
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Last Name</span>
    </div>
    <input type="text"
           className="input input-bordered w-full max-w-xs"
           value={lastName}
           onChange={(e)=>setlastName(e.target.value)}
            />
    </label>
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Photo URL</span>
    </div>
    <input type="text"
           className="input input-bordered w-full max-w-xs"
           value={photoUrl}
           onChange={(e)=>setPhotoUrl(e.target.value)}
            />
    </label>
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Age</span>
    </div>
    <input type="text"
           className="input input-bordered w-full max-w-xs"
           value={age}
           onChange={(e)=>setAge(e.target.value)}
            />
    </label>
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Gender</span>
    </div>
    <input type="text"
           value={gender}
           onChange={(e)=>setGender(e.target.value)}
           className="input input-bordered w-full max-w-xs" />
    </label>
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">About</span>
    </div>
    <input type="text"
           value={about}
           onChange={(e)=>setAbout(e.target.value)}
           className="input input-bordered w-full max-w-xs" />
    </label>
    <p className='text-red-500'> {error} </p>
      <div className="card-actions justify-center my-3">
        <button className="btn btn-primary"  onClick={saveProfile}
                >Save Profile</button>
      </div>
    </div>
  </div>
  </div>
   <Card user={{firstName,lastName,age,gender,photoUrl,about}}/>

   {showToast &&(  <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Updated successfully.</span>
  </div>
</div>)}

  </div>
  )
}

export default EditProfile
