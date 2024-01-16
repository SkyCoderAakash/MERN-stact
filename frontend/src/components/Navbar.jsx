import React from 'react';
import {Link} from 'react-router-dom';


const Navbar = ()=>{
    return (
        <div className="flex justify-between bg-lime-300">
            <div className='mx-10 my-2'>
                <img className="w-10 rounded-full" src="https://img.freepik.com/free-vector/gradient-code-logo-with-tagline_23-2148811020.jpg?size=338&ext=jpg&ga=GA1.1.1412446893.1705276800&semt=ais" alt="" />
            </div>
            <div className="flex justify-center items-center mx-10 my-2">
                <ul className='flex'>
                    <Link className='px-6 text-2xl font-medium' to="/"><li>Home</li></Link>
                    <Link className='px-6 text-2xl font-medium' to="/contact"><li>Contact</li></Link>
                    <Link className='px-6 text-2xl font-medium' to="/about"><li>About</li></Link>
                    <Link className='px-6 text-2xl font-medium' to="/login"><li>Login</li></Link>
                    <Link className='px-6 text-2xl font-medium' to="/register"><li>Signup</li></Link>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;