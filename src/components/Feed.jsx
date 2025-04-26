import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import Card from './Card'


const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store)=>store.feed);
 
  const getfeed = async()=>{
    if(feed) return;
    try {const res = await axios.get(
       BASE_URL+"/feed",
      {withCredentials:true}
    )
    console.log(res);
    dispatch(addFeed(res?.data));
  }

    catch(err){
      throw new Error("Something went wrong while loading the Feed");
    }
  } 

  useEffect(()=>{
    getfeed();
  },[])

  if(!feed) return <div className='flex justify-center'>Loading...</div>
  if(feed.length === 0) return <div className='flex justify-center mt-10'>No new users found!</div>
  return (
   feed && <div className='my-6 flex justify-center'>
     <Card user={feed[0]} />
    </div>
  )
}

export default Feed;
