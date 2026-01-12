import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../Context/UserContext';
import { LoadingSpinnner } from '../Components/Loading';
import { ChatData } from '../Context/ChatContext';
import { FiShield, FiLock, FiCheckCircle } from 'react-icons/fi'; // Icons for security feel

const Verify = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const { verifyUser, btnLoading } = useUserData();
    const { fetchChats } = ChatData();

    const submitHandler = (e) => {
        e.preventDefault();
        verifyUser(Number(otp), navigate, fetchChats);
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-[#0b0f1a] text-slate-200 relative overflow-hidden'>
            {/* Background Ambient Glows - Matching Login Page */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>

            <form 
                onSubmit={submitHandler} 
                className='relative z-10 bg-slate-900/50 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-slate-800 shadow-2xl w-[90%] md:w-[450px] transition-all'
            >
                {/* Security Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                        <FiShield className="text-white text-3xl" />
                    </div>
                    <h2 className='text-3xl font-bold text-white tracking-tight'>Verify Identity</h2>
                    <p className="text-slate-400 mt-2 text-sm text-center">
                        We've sent a 6-digit code to your email.
                    </p>
                </div>

                <div className='mb-6 relative'>
                    <label className='block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1' htmlFor='otp'>
                        One-Time Password
                    </label>
                    <div className="relative group">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input 
                            type="number" 
                            id="otp" 
                            placeholder="0 0 0 0 0 0"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className='w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl outline-none text-white text-center text-xl tracking-[0.5em] font-bold focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder:text-slate-700 placeholder:tracking-normal' 
                            required
                        />
                    </div>
                </div>

                <button 
                    disabled={btnLoading || !otp} 
                    className='w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 px-6 rounded-xl font-bold hover:from-cyan-500 hover:to-blue-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {btnLoading ? (
                        <LoadingSpinnner />
                    ) : (
                        <>
                            <FiCheckCircle className="text-xl" />
                            <span>Verify Code</span>
                        </>
                    )}
                </button>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-500">
                        Didn't receive the code? 
                        <button type="button" className="ml-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                            Resend
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Verify;


// import {React,useState} from 'react'
// import { useNavigate } from 'react-router-dom';
// import { useUserData } from '../Context/UserContext';
// import { LoadingSpinnner } from '../Components/Loading';
// import { ChatData } from '../Context/ChatContext';

// const Verify = () => {
//   const [otp, setOtp] = useState("");

//   const navigate = useNavigate();

//     const {verifyUser, btnLoading } = useUserData();
//     const {fetchChats} = ChatData();
  
//     const submitHandler = (e) => {
//         e.preventDefault() // page reload nhi hoga submit krne pe 
//         verifyUser(Number(otp), navigate, fetchChats);
//     }
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <form onSubmit = {submitHandler}  className='bg-white p-6 rounded shadow-md w-full md:w-[500px]'>
//           <h2 className='text-2xl mb-4'>Verify</h2>
//           <div className='mb-4'>
//               <label className='block text-gray-700 mb-2' htmlFor='otp'>
//                   Otp: 
//               </label>
//               <input type="number" id="otp" 
//               onChange= {(e)=> {setOtp(e.target.value)}}
//               className='border p-2 w-full rounded outline-none focus:ring-2 focus:ring-blue-500' required/>        
//           </div>
//           <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700' >{btnLoading ? <LoadingSpinnner/> : "Submit"}</button>
//         </form>
//       </div>
//     )
// }

// export default Verify
