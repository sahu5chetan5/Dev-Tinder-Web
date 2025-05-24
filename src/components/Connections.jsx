import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const connections = useSelector((store)=>store.connections)
    const dispatch = useDispatch()
    const fetchConnections = async()=>{
        try{
            const response = await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
            dispatch(addConnections(response.data.data))
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchConnections()
    },[])

    if (!connections || connections.length === 0) return <h1 className='flex justify-center my-10'>No connections found</h1>

    return (
        <div className='text-center my-10 px-4'>
            <h1 className='text-bold text-white text-3xl mb-8'>Connections</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto'>
                {connections.map((connection)=>{
                    const {_id,firstName,lastName,photoUrl,age,gender,about,skills} = connection;

                    return (
                        <div key={_id} className="flex flex-col md:flex-row items-center md:items-start p-4 rounded-lg bg-base-300">
                            <div className="mb-4 md:mb-0 md:mr-4 flex-shrink-0">
                                <div className="w-20 h-20 rounded-full overflow-hidden">
                                    <img alt="photo" className="w-full h-full object-cover" src={photoUrl}/>
                                </div>
                            </div>
                            <div className='text-center md:text-left'>
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
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Connections