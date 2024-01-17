import React,{useState} from 'react';
import { useNavigate,Link } from 'react-router-dom'

const Login = ()=>{
    const navigate = useNavigate();
    const [userData,setUserData] = useState({
        email : '',
        password : ''
    });
    const changeHandle = (e)=>{
        setUserData({...userData,[e.target.name]:e.target.value});
    };
    const submitHandle = async (e)=>{
        try {
            e.preventDefault();
            const loginSuccess = await fetch('http://localhost:5050/user/login',{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(userData),
            });
            // const data = await loginSuccess.json();
            const status = loginSuccess.status;
            if (loginSuccess.ok){
                const responseData = await loginSuccess.json();
                if (responseData.message === 'user login successfully') {
                    console.log('Login Successfully & welcome to our app');
                    console.log(status);
                    navigate('/');
                } else {
                    navigate(`/user/verification/${userData.email}`);
                    console.log('user is register but not verifrd');
                    console.log(status);
                }
            } else {
                console.log(`Server responded with status code: ${status}`);
                console.log(status);
            }
        } catch (error) {
            console.log(error.message);
        };
    };
    return(
        <div className="flex justify-center items-center p-16">
            <div className='border-2 rounded-2xl border-lime-700 px-20 py-5'>
                <form method='POST' onSubmit={submitHandle}>
                    <h1 className='text-xl text-center mb-5' >Login Form</h1>
                    <div className='m-3'>
                        <label htmlFor="email" className='text-base font-medium'>Email</label><br />
                        <input className='border-2 mt-1 px-2 py-0.5 w-96 rounded-lg border-lime-600' type="email" placeholder='Your email ...' name='email' value={userData.email} onChange={changeHandle} required />
                    </div>
                    <div className='m-3'>
                        <label htmlFor="password" className='text-base font-medium'>Password</label><br />
                        <input className='border-2 mt-1 px-2 py-0.5 w-96 rounded-lg border-lime-600' type="password" placeholder='Your password ...' name='password' value={userData.password} onChange={changeHandle} required />
                    </div>
                    <div className='m-3 px-1 flex justify-between text-xs font-medium'>
                        <div>Don't have an <Link className='text-sky-600' to='/register'>account</Link></div>
                        <div>Forgot <Link className='text-sky-600' to='/forgotPassword'>password</Link></div>
                    </div>
                    <button className='mx-3 border-2 px-2 py-0.5 w-96 rounded-lg border-blue-600 bg-blue-600 text-white' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Login;