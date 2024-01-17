import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ()=>{
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ name : '',email : '',contact : '',password : '',confirm_password : ''});
    const changeHandle = (e)=>{
        setUserData({...userData,[e.target.name]:e.target.value});
    };
    const submitHandle = async (e)=>{
        e.preventDefault();
        try {
            const registerSuccess = await fetch('http://localhost:5050/user/register',{
                method :"POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(userData),
            });
            const data = await registerSuccess.json();
            if(registerSuccess.ok){
                navigate(`/user/verification/${userData.email}`);
                console.log("registration please verify mail");
            }else{
                console.log('please fill the data proper');
            };
        } catch (error) {
            console.log(error.message);
        };
    };
    return(
        <div className="flex justify-center items-center p-16">
            <div className='border-2 rounded-2xl border-lime-700 px-20 py-5'>
                <form method='POST' onSubmit={submitHandle}>
                    <h1 className='text-xl text-center mb-5' >Registration Form</h1>
                    <div className='m-3'>
                        <label htmlFor="name" className='text-base font-medium'>Name</label><br />
                        <input className='border-2 mt-1 px-2 py-0.5 w-96 rounded-lg border-lime-600' type="text" placeholder='Your name ...' name='name' value={userData.name} onChange={changeHandle} required />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="email" className='text-base font-medium'>Email</label><br />
                        <input className='border-2 mt-1 px-2 py-0.5 w-96 rounded-lg border-lime-600' type="email" placeholder='Your email ...' name='email' value={userData.email} onChange={changeHandle} required />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="contact" className='text-base font-medium'>Contact</label><br />
                        <input className='border-2 mt-1 px-2 py-0.5 w-96 rounded-lg border-lime-600' type="number" placeholder='Your contact ...' name='contact' value={userData.contact} onChange={changeHandle} required />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="password" className='text-base font-medium'>Password</label><br />
                        <input className='border-2 mt-1 px-2 py-0.5 w-96 rounded-lg border-lime-600' type="password" placeholder='Your password ...' name='password' value={userData.password} onChange={changeHandle} required />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="confirm_password" className='text-base font-medium'>Confirm Password</label><br />
                        <input className='border-2 mt-1 px-2 py-0.5 w-96 rounded-lg border-lime-600' type="password" placeholder='Your confirm_password ...' name='confirm_password' value={userData.confirm_password} onChange={changeHandle} required />
                    </div>
                    <h5 className='mx-3 my-1 text-xs font-medium text-end'>
                        Already have an 
                        <Link to='/login' className='text-sky-600'> account</Link>
                    </h5>
                    <button className='m-3 border-2 mt-2 px-2 py-0.5 w-96 rounded-lg border-blue-600 bg-blue-600 text-white' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
};

export default Register;