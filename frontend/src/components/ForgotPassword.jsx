import React,{useState} from 'react';
import {Link} from 'react-router-dom';

const ForgotPassword = ()=>{
    const [userData,setUserData] = useState({email : ""});
    const changeHandle = (e)=>{
        setUserData({...userData,[e.target.name]:e.target.value})
    }; 
    const submitHandle = (e)=>{
        e.preventDefault();
        console.log(userData);
    };
    return(
        <div className="flex justify-center items-center p-16">
            <div className='border-2 rounded-2xl border-lime-700 px-20 py-5'>
                <form method='POST' onSubmit={submitHandle}>
                    <h1 className='text-xl text-center mb-5' >Forgot Password</h1>
                    <div className='m-3'>
                        <label htmlFor="email" className='text-base font-medium'>Email</label><br />
                        <input className='border-2 mt-1 px-2 py-0.5 w-96 rounded-lg border-lime-600' type="email" placeholder='Your email ...' name='email' value={userData.email} onChange={changeHandle} required />
                    </div>
                    <button className='mx-3 border-2 px-2 py-0.5 w-96 rounded-lg border-blue-600 bg-blue-600 text-white' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
};

export default ForgotPassword;