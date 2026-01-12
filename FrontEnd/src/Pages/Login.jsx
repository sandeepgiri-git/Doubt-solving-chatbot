import { React, useState } from 'react';
import { useUserData } from '../Context/UserContext'; 
import { useNavigate } from 'react-router-dom';
import { LoadingSpinnner } from '../Components/Loading';
import { FiMail, FiArrowRight } from 'react-icons/fi'; // Added icons for better UX

const Login = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { loginUser, btnLoading } = useUserData();

    const submitHandler = (e) => {
        e.preventDefault();
        loginUser(email, navigate);
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-[#0b0f1a] text-slate-200 relative overflow-hidden'>
            {/* Background Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>

            <form 
                onSubmit={submitHandler} 
                className='relative z-10 bg-slate-900/50 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-slate-800 shadow-2xl w-[90%] md:w-[450px] transition-all hover:border-slate-700/80'
            >
                {/* Branding/Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
                        <FiMail className="text-white text-3xl" />
                    </div>
                    <h2 className='text-3xl font-bold text-white tracking-tight'>Welcome Back</h2>
                    <p className="text-slate-400 mt-2 text-sm text-center">
                        Enter your email to access your AI workspace
                    </p>
                </div>

                <div className='mb-6 relative'>
                    <label className='block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1' htmlFor='email'>
                        Email Address
                    </label>
                    <div className="relative group">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            className='w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl outline-none text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600' 
                            required
                        />
                    </div>
                </div>

                <button 
                    disabled={btnLoading || !email} 
                    className='w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-bold hover:bg-indigo-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                >
                    {btnLoading ? (
                        <LoadingSpinnner />
                    ) : (
                        <>
                            <span>Continue</span>
                            <FiArrowRight className="text-xl" />
                        </>
                    )}
                </button>

                <p className="text-center text-slate-500 text-xs mt-8 px-4 leading-relaxed">
                    By continuing, you agree to our <span className="text-slate-400 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-slate-400 hover:underline cursor-pointer">Privacy Policy</span>.
                </p>
            </form>
        </div>
    );
};

export default Login;

// import {React,useState} from 'react'
// import { useUserData } from '../Context/UserContext'; 
// import { useNavigate } from 'react-router-dom';
// import { LoadingSpinnner } from '../Components/Loading';


// const Login = () => {
//     const [email, setEmail] = useState("");
    
//     const navigate = useNavigate();

//     const {loginUser, btnLoading} = useUserData(); // reciving data from userprovider

//     const submitHandler = (e) => {
//         e.preventDefault() // page reload nhi hoga submit krne pe 
//         loginUser(email, navigate);
//     }

//   return (
//     <div className='flex justify-center items-center h-screen'>
//       <form onSubmit = {submitHandler}  className='bg-white p-6 rounded shadow-md w-full md:w-[500px]'>
//         <h2 className='text-2xl mb-4'>Login</h2>
//         <div className='mb-4'>
//             <label className='block text-gray-700 mb-2' htmlFor='email'>
//                 Email: 
//             </label>
//             <input type="email" id="email" 
//             onChange= {e => {setEmail(e.target.value)}}
//             className='border p-2 w-full rounded outline-none focus:ring-2 focus:ring-blue-500' required/>        
//         </div>
//         <button disabled={btnLoading} className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700' >{btnLoading ? <LoadingSpinnner/> : "Submit"}</button>
//       </form>
//     </div>
//   )
// }

// export default Login
