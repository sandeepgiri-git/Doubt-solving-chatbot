import React from 'react';

// 1. LoadingSpinner: Used inside buttons (Login, Verify, New Chat)
export const LoadingSpinnner = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer Glow Ring */}
      <div className="w-5 h-5 border-2 border-indigo-500/30 rounded-full absolute"></div>
      {/* Spinning Part */}
      <div className="w-5 h-5 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin shadow-[0_0_10px_white]"></div>
    </div>
  );
};

// 2. LoadingScreen: Full page loader when switching chats or initial load
export const LoadingScreen = () => {
  return (
    /* Use absolute inset-0 to fill the exact container it is placed in */
    <div className="absolute inset-0 flex flex-col space-y-6 justify-center items-center bg-[#0b0f1a] z-50">
      <div className="flex space-x-3">
        <div className="h-4 w-4 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s] shadow-[0_0_15px_rgba(99,102,241,0.6)]"></div>
        <div className="h-4 w-4 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s] shadow-[0_0_15px_rgba(168,85,247,0.6)]"></div>
        <div className="h-4 w-4 bg-pink-500 rounded-full animate-bounce shadow-[0_0_15px_rgba(236,72,153,0.6)]"></div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-indigo-400 text-xs font-bold tracking-[0.2em] animate-pulse uppercase">
          Initializing AI
        </p>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      </div>
    </div>
  );
};

// 3. LoadingSmall: Used when the Bot is "typing" a response
export const LoadingSmall = () => {
  return (
    <div className="flex space-x-1.5 items-center p-2">
      <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce"></div>
      <span className="text-xs text-indigo-400 font-medium ml-2 italic">Thinking...</span>
    </div>
  );
};


// export const LoadingSpinnner = () => {
//     return (
//         <div className="inline-block w-5 h-5 border-2 border-t-2 border-r-transparent
//         border-white rounded-full animate-spin">

//         </div>
//     )
// }

// export const LoadingScreen = () => {
//     return (
//         <div className="flex space-x-2 justify-center items-center w=[200px] m-auto mt-[300px]">
//             <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3]"></div>
//             <div className="h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15]"></div>
//             <div className="h-8 w-8 bg-white rounded-full animate-bounce "></div>
//         </div>

//     )
// }

// export const LoadingSmall = () => {
//     return (
//         <div className="flex space-x-2 justify-center items-center ">
//             <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3]"></div>
//             <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15]"></div>
//             <div className="h-4 w-4 bg-white rounded-full animate-bounce "></div>
//         </div>

//     )
// }