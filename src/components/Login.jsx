import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../utils/constants";

export const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [error, setError] = useState("") 
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Attempting login with:", { emailId, password });
      const response = await axiosInstance.post("/login", {
        emailId,
        password,
      });

      console.log("Login response:", response.data);

      if (response.data.token) {
        // Set token in cookie
        
        // Add user to Redux store
        dispatch(addUser(response.data.user));
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || error.message || "An error occurred during login"
      );
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Attempting signup with:", { firstName, lastName, emailId, password });
      const response = await axiosInstance.post("/signup", {
        firstName,
        lastName,
        emailId,
        password,
      });

      console.log("Signup response:", response.data);

      if (response.data.token) {
        // Set token in cookie
        // Add user to Redux store
        dispatch(addUser(response.data.user));
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || error.message || "An error occurred during signup"
      );
    }
  };

  return (
    <div className='flex justify-center my-8'>
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
          <form onSubmit={isLoginForm ? handleLogin : handleSignUp}>
            <div>
              {!isLoginForm && (
                <>
                  <label className='form-control w-full max-w-xs my-2'>
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">First Name</legend>
                      <input 
                        type="text" 
                        className="input" 
                        value={firstName}  
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </fieldset>
                  </label>

                  <label className='form-control w-full max-w-xs my-2'>
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Last Name</legend>
                      <input 
                        type="text" 
                        className="input" 
                        value={lastName}  
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </fieldset>
                  </label>
                </>
              )}

              <label className='form-control w-full max-w-xs my-2'>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Email ID</legend>
                  <input 
                    type="email" 
                    className="input" 
                    value={emailId}  
                    onChange={(e) => setEmailId(e.target.value)}
                    required
                  />
                </fieldset>
              </label>

              <label className='form-control w-full max-w-xs my-2'>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Password</legend>
                  <input 
                    type="password" 
                    className="input" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </fieldset>
              </label>
            </div>
            <p className='text-red-500'>{error}</p>
            <div className="card-actions justify-center my-2">
              <button type="submit" className="btn btn-primary">
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>
          <p 
            className="m-auto cursor-pointer py-2" 
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm ? "New User? Sign Up here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;