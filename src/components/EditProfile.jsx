import React, { useState } from 'react'
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';

const EditProfile = ({user}) => {
     const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age||"");
    const [gender,setGender] = useState(user.gender||"") 
    const [about, setAbout] = useState(user.about||"");
    const [photoUrl,setPhotoUrl] = useState(user.photoUrl||"")
    const [skills, setSkills] = useState(user.skills?.join(', ') || "");
    const [error,setError] = useState("")
    const dispatch= useDispatch()
    const [showToast,setShowToast] = useState(false)

    const saveProfile = async()=>{
        setError("")
        try{
            // Convert comma-separated skills string to array
            const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
            
            const res = await axios.patch(
                BASE_URL+"/profile/edit",{
                    firstName,
                    lastName,
                    age,
                    gender,
                    about,
                    photoUrl,
                    skills: skillsArray
                },
                {withCredentials:true}
            );
            dispatch(addUser(res?.data?.data))
            setShowToast(true)
            setTimeout(()=>{
                setShowToast(false)
            },2000)
        }catch(err){
            setError(err.response.data)
        }
    }

    return (
        <div className='flex flex-col md:flex-row justify-center items-center my-10 mb-20 px-4'>
            <div className='w-full md:w-96 mb-8 md:mb-0 md:mr-8'>
                <div className="card bg-base-200 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div className="space-y-4">
                            <label className='form-control w-full'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input type="text" className="input input-bordered w-full" value={firstName} onChange={(e)=>{
                                        setFirstName(e.target.value)
                                    }}/>
                                </fieldset>
                            </label>
                    
                            <label className='form-control w-full'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input type="text" className="input input-bordered w-full" value={lastName} onChange={(e)=>{
                                        setLastName(e.target.value)
                                    }}/>
                                </fieldset>
                            </label>

                            <label className='form-control w-full'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Photo</legend>
                                    <input type="text" className="input input-bordered w-full" value={photoUrl} onChange={(e)=>{
                                        setPhotoUrl(e.target.value)
                                    }}/>
                                </fieldset>
                            </label>

                            <label className='form-control w-full'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Age</legend>
                                    <input type="text" className="input input-bordered w-full" value={age} onChange={(e)=>{
                                        setAge(e.target.value)
                                    }}/>
                                </fieldset>
                            </label>

                            <label className='form-control w-full'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <input type="text" className="input input-bordered w-full" value={gender} onChange={(e)=>{
                                        setGender(e.target.value)
                                    }}/>
                                </fieldset>
                            </label>

                            <label className='form-control w-full'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Skills (comma-separated)</legend>
                                    <input type="text" className="input input-bordered w-full" value={skills} onChange={(e)=>{
                                        setSkills(e.target.value)
                                    }} placeholder="e.g. JavaScript, Node.js, React"/>
                                </fieldset>
                            </label>

                            <label className='form-control w-full'>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">About</legend>
                                    <input type="text" className="input input-bordered w-full" value={about} onChange={(e)=>{
                                        setAbout(e.target.value)
                                    }}/>
                                </fieldset>
                            </label>
                        </div>
                        <p className='text-red-500'>{error}</p>
                        <div className="card-actions justify-center my-2">
                            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full md:w-96'>
                <UserCard user={{firstName,lastName,photoUrl,age,gender,about,skills: skills.split(',').map(skill => skill.trim()).filter(skill => skill)}}/>
            </div>
            
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile is saved successfully.</span>
                </div>
            </div>}
        </div>
    )
}

export default EditProfile