import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(store => store.user)

    const fetchUser = async () => {
        if (userData && Object.keys(userData).length > 0) {
            console.log("User data already exists:", userData);
            return;
        }
        try {
            console.log("Fetching user data...");
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true
            });
            console.log("User API response:", res.data);
            dispatch(addUser(res.data));
        } catch (err) {
            console.error("Error fetching user:", err);
            if (err.response?.status === 401 || err.response?.status === 400) {
                navigate("/login");
            }
        }
    }

    useEffect(() => {
        console.log("Body component mounted");
        fetchUser();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Body