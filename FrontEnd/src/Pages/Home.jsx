import React, { useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { ChatData } from '../Context/ChatContext';
import { LoadingScreen, LoadingSmall } from '../Components/Loading';

import { FaMicrophone } from 'react-icons/fa'; //microphone option icon

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false); //microphone

  const { fetchResponse, messages, prompt, setPrompt, newRequestLoading,loading } = ChatData();
  
  const toggleSidebar = () => setIsOpen(!isOpen);

  const submitHandler = (e) => {
    e.preventDefault();
    if (prompt.trim()) fetchResponse();
  };

  const messageContainerRef = useRef();

  useEffect(() => {
    if(messageContainerRef.current){
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [messages]);

  // const createMarkup = (html) => {
  //   // First, handle code blocks
  //   let formatted = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, 
  //     '<pre class="bg-gray-800 p-4 rounded-md overflow-x-auto my-2"><code class="text-sm">$2</code></pre>'
  //   );
    
  //   // Then handle inline code
  //   formatted = formatted.replace(/`([^`]+)`/g, 
  //     '<code class="bg-gray-800 px-1.5 py-0.5 rounded text-sm">$1</code>'
  //   );
    
  //   // Finally, convert remaining newlines to <br> tags
  //   formatted = formatted.replace(/\n/g, '<br>');
    
  //   return { __html: formatted };
  // };

  const createMarkup = (html) => {
    // First handle code blocks
    let formatted = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, 
      '<pre class="bg-gray-800 p-4 rounded-md overflow-x-auto my-2"><code class="text-sm">$2</code></pre>'
    );
    
    // Handle bold text (**bold**)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, 
      '<strong class="font-semibold">$1</strong>'
    );
    
    // Handle italic text (*italic*)
    formatted = formatted.replace(/\*(.*?)\*/g, 
      '<em class="italic">$1</em>'
    );
    
    // Then handle inline code
    formatted = formatted.replace(/`([^`]+)`/g, 
      '<code class="bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
    );
    
    // Finally, convert remaining newlines to <br> tags
    formatted = formatted.replace(/\n/g, '<br>');
    
    return { __html: formatted };
  };


  //microphone
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // Set language

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(prev => prev ? `${prev} ${transcript}` : transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const toggleListening = () => {
    setIsListening(prev => !prev);
  };

  return (
    <div className='flex h-screen bg-gray-900 text-white overflow-hidden'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className='flex flex-col flex-1'>
        <button 
          onClick={toggleSidebar} 
          className='md:hidden p-4 text-2xl text-gray-300 hover:text-white transition-colors'
          aria-label="Toggle sidebar"
        >
          <GiHamburgerMenu/>
        </button>

        <Header/>

        {/* Chat Container  change line 94*/ }
        
        {loading ? <LoadingScreen/> : (<div ref = {messageContainerRef} className='bg-gray-950 flex-1 overflow-y-auto thin-scrollbar p-4 md:p-6'> 
          {messages?.length > 0 ? (
            <div className="space-y-6 max-w-3xl mx-auto">
              {messages.map((message, index) => (
                <React.Fragment key={index}>
                  {/* User Message */}
                  <div className='flex gap-3'>
                    <div className="flex-shrink-0 bg-blue-600 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                      <CgProfile className="text-white text-xl"/>
                    </div>
                    <div className='bg-blue-700/80 rounded-lg p-4 shadow-md flex-1'>
                      <p className="text-white">{message.question}</p>
                    </div>
                  </div>

                  {/* Bot Response */}
                  <div className='flex gap-3'>
                    <div className="flex-shrink-0 bg-gray-600 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                      <FaRobot className="text-white text-xl"/>
                    </div>
                    <div 
                      className='bg-gray-700/80 rounded-lg p-4 shadow-md flex-1 prose prose-invert max-w-none'
                      dangerouslySetInnerHTML={createMarkup(message.answer)}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <FaRobot className="text-5xl mb-4 opacity-50"/>
              <p className="text-lg">Ask me anything about your doubts</p>
              <p className="text-sm mt-2">I'm here to help you learn!</p>
            </div>
          )}

          {newRequestLoading && (
            <div className="flex gap-3 max-w-3xl mx-auto mt-6">
              <div className="flex-shrink-0 bg-gray-600 p-2 rounded-full h-10 w-10 flex items-center justify-center">
                <FaRobot className="text-white text-xl"/>
              </div>
              <div className='bg-gray-700/80 rounded-lg p-4 shadow-md flex-1'>
                <LoadingSmall/>
              </div>
            </div>
          )}
        </div>)}

        {/* Input Area */}
        <div className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm p-4">
        <form 
          onSubmit={submitHandler} 
          className='flex gap-2 max-w-3xl mx-auto'
        >
          <input 
            className='flex-grow p-3 bg-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all'
            type="text" 
            placeholder='Type or speak your doubt...' 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
            required
            aria-label="Chat input"
          />
          <button
            type="button" 
            onClick={toggleListening}
            className={`p-3 rounded-lg text-white transition-colors ${
              isListening 
                ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
            disabled={newRequestLoading}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
          >
            <FaMicrophone className="text-xl" />
          </button>
          <button 
            type="submit"
            className={`p-3 rounded-lg text-white transition-colors ${
              prompt.trim() 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-700 cursor-not-allowed'
            }`}
            disabled={!prompt.trim() || newRequestLoading}
          >
            <IoMdSend className="text-xl"/>
          </button>
        </form>
          {/* <form 
            onSubmit={submitHandler} 
            className='flex gap-2 max-w-3xl mx-auto'
          >
            <input 
              className='flex-grow p-3 bg-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all'
              type="text" 
              placeholder='Type your doubt here...' 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)}
              required
              aria-label="Chat input"
            />
            <button 
              type="submit"
              className={`p-3 rounded-lg text-white transition-colors ${prompt.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 cursor-not-allowed'}`}
              disabled={!prompt.trim() || newRequestLoading}
            >
              <IoMdSend className="text-xl"/>
            </button>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Home;



// import React, { useState } from 'react';
// import { GiHamburgerMenu } from "react-icons/gi";
// import { CgProfile } from "react-icons/cg";
// import { FaRobot } from "react-icons/fa";
// import { IoMdSend } from "react-icons/io";
// import Sidebar from '../Components/Sidebar';
// import Header from '../Components/Header';
// import { ChatData } from '../Context/ChatContext';
// import { LoadingSmall } from '../Components/Loading';

// const Home = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { fetchResponse, messages, prompt, setPrompt, newRequestLoading } = ChatData();
  
//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (prompt.trim()) fetchResponse();
//   };

//   const createMarkup = (html) => ({ __html: html });

//   return (
//     <div className='flex h-screen bg-gray-900 text-white overflow-hidden'>
//       <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

//       <div className='flex flex-col flex-1'>
//         <button 
//           onClick={toggleSidebar} 
//           className='md:hidden p-4 text-2xl text-gray-300 hover:text-white transition-colors'
//           aria-label="Toggle sidebar"
//         >
//           <GiHamburgerMenu/>
//         </button>

//         <Header/>

//         {/* Chat Container */}
//         <div className='flex-1 overflow-y-auto thin-scrollbar p-4 md:p-6'>
//           {messages?.length > 0 ? (
//             <div className="space-y-6 max-w-3xl mx-auto">
//               {messages.map((message, index) => (
//                 <React.Fragment key={index}>
//                   {/* User Message */}
//                   <div className='flex gap-3'>
//                     <div className="flex-shrink-0 bg-blue-600 p-2 rounded-full h-10 w-10 flex items-center justify-center">
//                       <CgProfile className="text-white text-xl"/>
//                     </div>
//                     <div className='bg-blue-700/80 rounded-lg p-4 shadow-md flex-1'>
//                       <p className="text-white">{message.question}</p>
//                     </div>
//                   </div>

//                   {/* Bot Response */}
//                   <div className='flex gap-3'>
//                     <div className="flex-shrink-0 bg-gray-600 p-2 rounded-full h-10 w-10 flex items-center justify-center">
//                       <FaRobot className="text-white text-xl"/>
//                     </div>
//                     <div 
//                       className='bg-gray-700/80 rounded-lg p-4 shadow-md flex-1 prose prose-invert max-w-none'
//                       dangerouslySetInnerHTML={createMarkup(message.answer)}
//                     />
//                   </div>
//                 </React.Fragment>
//               ))}
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center h-full text-gray-400">
//               <FaRobot className="text-5xl mb-4 opacity-50"/>
//               <p className="text-lg">Ask me anything about your doubts</p>
//               <p className="text-sm mt-2">I'm here to help you learn!</p>
//             </div>
//           )}

//           {newRequestLoading && (
//             <div className="flex gap-3 max-w-3xl mx-auto mt-6">
//               <div className="flex-shrink-0 bg-gray-600 p-2 rounded-full h-10 w-10 flex items-center justify-center">
//                 <FaRobot className="text-white text-xl"/>
//               </div>
//               <div className='bg-gray-700/80 rounded-lg p-4 shadow-md flex-1'>
//                 <LoadingSmall/>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input Area */}
//         <div className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm p-4">
//           <form 
//             onSubmit={submitHandler} 
//             className='flex gap-2 max-w-3xl mx-auto'
//           >
//             <input 
//               className='flex-grow p-3 bg-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all'
//               type="text" 
//               placeholder='Type your doubt here...' 
//               value={prompt} 
//               onChange={(e) => setPrompt(e.target.value)}
//               required
//               aria-label="Chat input"
//             />
//             <button 
//               type="submit"
//               className={`p-3 rounded-lg text-white transition-colors ${prompt.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 cursor-not-allowed'}`}
//               disabled={!prompt.trim() || newRequestLoading}
//             >
//               <IoMdSend className="text-xl"/>
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


// import React, { useState } from 'react'
// import Sidebar from '../Components/Sidebar'
// import { GiHamburgerMenu } from "react-icons/gi";
// import Header from '../Components/Header';
// import { ChatData } from '../Context/ChatContext';
// import { CgProfile } from "react-icons/cg";
// import { FaRobot } from "react-icons/fa";
// import { IoMdSend } from "react-icons/io";
// import { LoadingSmall } from '../Components/Loading';

// const Home = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { fetchResponse, messages, prompt, setPrompt, newRequestLoading } = ChatData();
  
//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (prompt.trim()) fetchResponse();
//   };

//   // Safe HTML renderer
//   const createMarkup = (html) => {
//     try {
//       return { __html: html };
//     } catch (err) {
//       console.error("HTML parsing error:", err);
//       return { __html: "Couldn't display this message" };
//     }
//   };

//   return (
//     <div className='flex h-screen bg-gray-900 text-white'>
//       <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

//       <div className='flex flex-1 flex-col'>
//         <button 
//           onClick={toggleSidebar} 
//           className='md:hidden p-4 bg-gray-800 text-2xl'
//           aria-label="Toggle sidebar"
//         >
//           <GiHamburgerMenu/>
//         </button>

//         <div className='flex-1 p-6 mb-20 md:mb-0'>
//           <Header/>

//           <div className='thin-scrollbar flex-1 p-6 max-h-[600px] overflow-y-auto mb-20 md:mb-0'>
//             {messages?.length > 0 ? (
//               messages.map((message, index) => (
//                 <React.Fragment key={index}>
//                   {/* User Message */}
//                   <div className='mb-4 p-4 rounded bg-blue-700 text-white'>
//                     <div className="bg-white p-2 rounded-full text-black text-2xl h-10 w-10 flex items-center justify-center">
//                       <CgProfile/>
//                     </div>
//                     <p className="mt-2">{message.question}</p>
//                   </div>

//                   {/* Bot Response */}
//                   <div className="mb-4 p-4 rounded bg-gray-700 text-white">
//                     <div className="bg-white p-2 rounded-full text-black text-2xl h-10 w-10 flex items-center justify-center">
//                       <FaRobot/>
//                     </div>
//                     <div 
//                       className="mt-2" 
//                       dangerouslySetInnerHTML={createMarkup(message.answer)} 
//                     />
//                   </div>
//                 </React.Fragment>
//               ))
//             ) : (
//               <p className="text-gray-400 italic">No chat history yet</p>
//             )}

//             {newRequestLoading && <LoadingSmall/>}
//           </div>
//         </div> 
//       </div>

//       <div className="fixed bottom-0 right-0 left-auto p-4 bg-gray-900 w-full md:w-[75%]">
//         <form 
//           onSubmit={submitHandler} 
//           className='flex justify-center items-center'
//         >
//           <input 
//             className='flex-grow p-4 bg-gray-700 rounded-l text-white outline-none'
//             type="text" 
//             placeholder='Enter your question...' 
//             value={prompt} 
//             onChange={(e) => setPrompt(e.target.value)}
//             required
//             aria-label="Chat input"
//           />
//           <button 
//             type="submit"
//             className='p-4 bg-gray-700 rounded-r text-2xl text-white hover:bg-gray-600 transition-colors'
//             disabled={newRequestLoading}
//           >
//             <IoMdSend/>
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Home;

// // // import React, { useState } from 'react'
// // // import Sidebar from '../Components/Sidebar'
// // // import { GiHamburgerMenu } from "react-icons/gi";
// // // import Header from '../Components/Header';
// // // import { ChatData } from '../Context/ChatContext';
// // // import { CgProfile } from "react-icons/cg";
// // // import { FaRobot } from "react-icons/fa";
// // // import { IoMdSend } from "react-icons/io";
// // // import { LoadingSmall } from '../Components/Loading';


// // // const Home = () => {
// // //   const [isOpen, setIsOpen] = useState(false);
  
// // //   const toggleSidebar = () =>{
// // //     setIsOpen(!isOpen);
// // //     // console.log(isOpen);
// // //   }
  
// // //   const {fetchResponse, messages, prompt, setPrompt, newRequestLoading} = ChatData();
  
// // //   const submitHandler = (e) =>{
// // //     e.preventDefault();
// // //     fetchResponse();
// // //   }

// // //   return (
// // //     <div className='flex h-screen bg-gray-900 text-white'>
// // //       <Sidebar isOpen={isOpen} toggleSidebar= {toggleSidebar}/>

// // //       <div className='flex flex-1 flex-col'>
// // //         <button onClick={toggleSidebar} className='md:hidden p-4 bg-gray-800 text-2xl'><GiHamburgerMenu/></button>

// // //         <div className='flex-1 p-6 mb-20 md:mb-0'>
// // //           <Header/>

// // //           <div className='thin-scrollbar flex-1 p-6 max-h-[600px] overflow-y-auto mb-20 md:mb-0 '>
// // //               {messages && messages.length > 0 ? messages.map((e, i) => {
// // //                 return (
// // //                   <div key={i}>
// // //                     <div className='mb-4 p-4 rounded bg-blue-700 text-white'>
// // //                       <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
// // //                         <CgProfile/>
// // //                       </div>
// // //                       {e.question}
// // //                     </div>

// // //                     <div className="mb-4 p-4 rounded bg-gray-700 text-white">
// // //                       <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
// // //                           <FaRobot/>
// // //                         </div>
// // //                       <p dangerouslySetInnerHTML={{__html: e.answer}}>  </p>
// // //                     </div>
// // //                   </div>
// // //                 )
// // //                 }) : (<p> No chat yet </p>)}

// // //                 {newRequestLoading && <LoadingSmall/>}
// // //           </div>
// // //         </div> 
// // //       </div>

// // //       <div className="fixed bottom-0 right-0 left-auto p-4 bg-gray-900 w-full mg:w-[75%] ">
// // //         <form 
// // //           onSubmit={submitHandler} 
// // //           className='flex justify-center items-center'
// // //         >
          
// // //           <input 
// // //             className='flex-grow p-4 bg-gray-700 rounded-l text-white outline-none'
// // //             type="text" placeholder='Enter prompt here' 
// // //             value={prompt} 
// // //             onChange={(e) => setPrompt(e.target.value)}
// // //             required
// // //           />

// // //           <button 
// // //             className='p-4 bg-gray-700 rounded-r text-2xl text-white'
// // //           >
// // //             <IoMdSend/>
// // //           </button>
// // //         </form>
// // //       </div>

// // //     </div>
// // //   )
// // // }

// // // export default Home

