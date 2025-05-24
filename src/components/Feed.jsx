import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

function Feed() {
    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch();

    useEffect(() => {
        const getFeed = async () => {
            try {
                console.log("Fetching feed data...");
                const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
                console.log("Feed API response:", res.data);
                dispatch(addFeed(res.data.data));
            } catch (err) {
                console.error("Error fetching feed:", err);
            }
        };

        if (!feed) {
            getFeed();
        }
    }, [feed, dispatch]);

    // Debug logs
    console.log("Current feed state:", feed);

    if (!feed) {
        console.log("Feed is null, showing loading state");
        return <div className="flex justify-center my-10">Loading...</div>;
    }

    if (feed.length <= 0) {
        console.log("Feed is empty");
        return <h1 className='flex justify-center my-10'>No new users found!! Please come after sometime. :)</h1>;
    }

    console.log("Rendering feed with user:", feed[0]);

    return (
        <div className='flex justify-center my-10'>
            <UserCard user={feed[0]} isFeedView={true} />
        </div>
    );
}

export default Feed