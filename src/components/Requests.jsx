import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'
import axios from 'axios'

const Requests = () => {
    const requests = useSelector(store=>store.requests)
    const dispatch = useDispatch()
    
    const reviewRequest = async(status,_id)=>{
        try{
            const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,
                {},
                {withCredentials:true}
            );
            dispatch(removeRequest(_id))
        }catch(err){
            console.log(err)
        }   
    }

    useEffect(()=>{
        const fetchRequests = async()=>{
            try{
                const res = await axios.get(BASE_URL+"/user/requests/received",{
                    withCredentials:true
                });
                dispatch(addRequests(res.data.data))
            }catch(err){
                console.log(err)
            }
        }
        fetchRequests()
    },[])

    if (!requests || requests.length === 0) return <h1 className='flex justify-center my-10'>No Requests found</h1>

    return (
        <div className='text-center my-10 px-4'>
            <h1 className='text-bold text-white text-3xl mb-8'>Connection Requests</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto'>
                {requests.map((request)=>{
                    const {_id,firstName,lastName,photoUrl,age,gender,about,skills} = request.fromUserId;

                    return (
                        <div key={_id} className="flex flex-col md:flex-row items-center md:items-start p-4 rounded-lg bg-base-300">
                            <div className="mb-4 md:mb-0 md:mr-4 flex-shrink-0">
                                <div className="w-20 h-20 rounded-full overflow-hidden">
                                    <img alt="photo" className="w-full h-full object-cover" src={photoUrl}/>
                                </div>
                            </div>
                            <div className='text-center md:text-left flex-grow'>
                                <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                                {age && gender && <p>{age + ", "+ gender}</p>}
                                <p className="mt-2">{about}</p>
                                {skills && skills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 my-2">
                                        {skills.map((skill, index) => (
                                            <span key={index} className="badge badge-primary">{skill}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className='flex flex-col md:flex-row gap-2 mt-4 md:mt-0'>
                                <button className="btn btn-error btn-sm" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
                                <button className="btn btn-success btn-sm" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Requests