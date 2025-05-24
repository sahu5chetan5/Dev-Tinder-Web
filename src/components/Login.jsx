import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


export const Login = () => {

      const [emailId, setEmailId] = useState("");
      const [password, setPassword] = useState("");
      const [firstName,setFirstName] = useState("")
      const [lastName,setLastName] = useState("")
      const [isLoginForm, setIsLoginForm] = useState(false)
      const [error,setError] = useState("") 
      const dispatch = useDispatch()
      const navigate = useNavigate();
     

      const handleLogin = async()=>{
        try{
          // First login to get the session
          await axios.post(
            BASE_URL+"/login",{
            emailId,
            password
          },{
            withCredentials:true
          });

          // Then fetch complete profile data
          const profileRes = await axios.get(BASE_URL+"/profile/view", {
            withCredentials: true
          });
          
          dispatch(addUser(profileRes.data))
          return navigate("/")
        }
        catch(err){
          setError(err?.response?.data||"Something went wrong")
        }
      }

      const handleSignUp = async()=>{
        try{
            const res = await axios.post(
              BASE_URL+"/signup",{
                firstName,
                lastName,
                emailId,
                password
              },{withCredentials:true})
               dispatch(addUser(res.data.data))
               return navigate("/profile")
        }catch(err){
          console.log(err)
        }
      }

  return (
    <div className='flex justify-center my-8'>
    <div className="card bg-base-200 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm ? "Login": "Sign Up"}</h2>
    <div>

{!isLoginForm && (<>
      <label className='form-control w-full max-w-xs my-2'>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input type="text" className="input" value={firstName}  onChange={(e)=>{
                  setFirstName(e.target.value)
                }}/>
            </fieldset>
        </label>

        <label className='form-control w-full max-w-xs my-2'>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input type="text" className="input" value={lastName}  onChange={(e)=>{
                  setLastName(e.target.value)
                }}/> 

            </fieldset>
        </label></>)}

        <label className='form-control w-full max-w-xs my-2'>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID</legend>
                <input type="text" className="input" value={emailId}  onChange={(e)=>{
                  setEmailId(e.target.value)
                }}/>
            </fieldset>
        </label>


        <label className='form-control w-full max-w-xs my-2'>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input type="password" className="input" value={password} onChange={(e)=>{
                  setPassword(e.target.value)
                }}/>
            </fieldset>
        </label>


    </div>
    <p className='text-red-500'>{error}</p>
        <div className="card-actions justify-center my-2">
          <button className="btn btn-primary" onClick = {isLoginForm? handleLogin : handleSignUp}> {isLoginForm ? "Login" : "Sign Up"}</button>
       </div>

       <p className="m-auto cursor-pointer py-2" onClick = {()=>setIsLoginForm((value) => !value)}>{isLoginForm? "New User? Sign Up here": "Existing User? Login Here"}</p>
  </div>
</div>
</div>
  )
}


export default Login