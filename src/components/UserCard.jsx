import React from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice'

const UserCard = ({user, isFeedView = false}) => {
  const {_id, firstName, lastName, photoUrl, age, gender, about, skills} = user
  const dispatch = useDispatch()

  // Debug log to check skills data
  console.log("UserCard skills:", skills);

  const handleSendRequest = async(status,userId)=>{
    try{
      const res = await axios.post(
        BASE_URL+"/request/send/"+status+"/"+userId,{},
        {withCredentials:true}
      );
      dispatch(removeUserFromFeed(userId))
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="card bg-base-300 w-96 h-[500px] shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " "+lastName}</h2>
        {age && gender && <p>{age + ", "+ gender}</p>}
        <p>{about}</p>
        {skills && Array.isArray(skills) && skills.length > 0 && (
          <div className="flex flex-wrap gap-2 my-2">
            {skills.map((skill, index) => (
              <span key={index} className="badge badge-primary">{skill}</span>
            ))}
          </div>
        )}
        {isFeedView && (
          <div className="card-actions justify-end my-4">
            <button className="btn btn-error" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
            <button className="btn btn-success" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserCard