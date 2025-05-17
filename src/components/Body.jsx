import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet,useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(store=>store.user)

  const fetchUser = async()=>{
    if (userData && Object.keys(userData).length > 0) return ;
    try{
      const res = await axios.get(BASE_URL+"/profile/view",{
        withCredentials:true
      }); 
      
      dispatch(addUser(res.data))
    }catch(err){
      if (err.status===401 || err.status===400){
        navigate("/login")
      }
      
      console.log(err)
    }
  }

    useEffect(()=>{
        fetchUser()
  },[])
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
        
    </div>
  )
}


export default Body