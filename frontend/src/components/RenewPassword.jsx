import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

const RenewPassword = ()=>{
    const {email} = useParams();
    const navigate = useNavigate();
    const [userData,setUserData] = useState({password : '',confirm_password : ''});
    const changeHandle  = (e)=>{
        setUserData({...userData,[e.target.name]:e.target.value});
    };
    const submitHandle = async (e)=>{
        try {
            e.preventDefault();
            if(userData.password==userData.confirm_password){
                const passwordUpdate = await fetch(`http://localhost:5050/user/renewPassword/${email}`,{
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify(userData),
                });
                if(passwordUpdate.ok){
                    navigate('/');
                };
            }else(
                console.log('pleae fill both fied equal')
            );
        } catch (error) {
            console.log(error.message);
        };
    };

    return(
        <div className="flex justify-center items-center p-16">
            <div className='border-2 rounded-2xl border-lime-700 px-20 py-5'>
                <form method='POST' onSubmit={submitHandle}>
                    <h1 className='text-xl text-center mb-5' >Renew Password</h1>
                    <div className='m-3'>
                        <label htmlFor="password" className='text-base font-medium'>Password</label><br />
                        <input className='border-2 mt-1 px-2 py-0.5 w-96 rounded-lg border-lime-600' type="password" placeholder='Your password ...' name='password' value={userData.password} onChange={changeHandle} required />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="confirm_password" className='text-base font-medium'>Confirm Password</label><br />
                        <input className='border-2 mt-1 px-2 py-0.5 w-96 rounded-lg border-lime-600' type="password" placeholder='Your password ...' name='confirm_password' value={userData.confirm_password} onChange={changeHandle} required />
                    </div>
                    <button className='mx-3 border-2 px-2 py-0.5 w-96 rounded-lg border-blue-600 bg-blue-600 text-white' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RenewPassword;