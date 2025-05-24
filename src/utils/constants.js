import axios from 'axios';

export const BASE_URL = "https://dev-tinder-ffpk.onrender.com"

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';