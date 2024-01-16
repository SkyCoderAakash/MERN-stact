import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

const VerifyMail = ()=>{
    const {email} = useParams();
    const navigate = useNavigate();
    const [text,setText] = useState({
        otp : ""
    });
    const changeHandle = (e)=>{
        setText({...text,[e.target.name]:e.target.value});
    };
    const submitHandle = async (e)=>{
        e.preventDefault();
        try {
            const getOTP = await fetch(`http://localhost:5050/user/verification/${email}`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(text)
            });
            if(getOTP.ok){
                navigate('/');
                console.log('welcome to our app');
            }else{
                console.log("invalid OTP");
            }
        } catch (error) {
            console.log(error.message);
        };
    };
    const resendOTP = async ()=>{
        try {
            const resend = await fetch(`http://localhost:5050/register/resendOTP/${email}`,{
                method : "POST",
            });
            if(resend.ok){
                console.log('email send again by front end');
            }else(
                console.log("please wait for 2 min")
            )
        } catch (error) {
            console.log(error.message);
        }
    };

    return(
        <div className="flex justify-center items-center p-16">
            <div className='border-2 rounded-2xl border-lime-700 px-20 py-5'>
            <h1 className='text-xl text-center mb-5' >OTP Verification</h1>
                <form method='POST' onSubmit={submitHandle}>
                    <div className='m-3'>
                        <label htmlFor="otp" className='text-base font-medium'>OTP</label><br />
                        <input className='border-2 mt-1 px-2 py-0.5 w-96 rounded-lg border-lime-600' type="number" placeholder='Your OTP ...' name='otp' value={text.otp} onChange={changeHandle} required />
                    </div>
                    <button className='mx-3 my-1 border-2 px-2 py-0.5 w-96 rounded-lg border-blue-600 bg-blue-600 text-white' type='submit'>Verify</button>
                </form>
                <button className='mx-3 px-2 py-0.5 border text-white border-white bg-neutral-950 rounded-md'  onClick={resendOTP}>Resend OTP</button>
            </div>
        </div>
    );
};

export default VerifyMail