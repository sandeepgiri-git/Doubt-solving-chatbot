import React, { useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FaRobot, FaMicrophone, FaRegLightbulb } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { ChatData } from '../Context/ChatContext';
import { LoadingScreen, LoadingSmall } from '../Components/Loading';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const { fetchResponse, messages, prompt, setPrompt, newRequestLoading, loading } = ChatData();
  
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

  const createMarkup = (html) => {
    let formatted = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, 
      '<pre class="bg-[#0f172a] p-4 rounded-xl overflow-x-auto my-3 border border-slate-700/50 shadow-inner"><code class="text-pink-400 text-sm font-mono">$2</code></pre>'
    );
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-slate-300">$1</em>');
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-400 text-sm font-mono">$1</code>');
    formatted = formatted.replace(/\n/g, '<br>');
    return { __html: formatted };
  };

  // Speech Recognition Logic remains same
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(prev => prev ? `${prev} ${transcript}` : transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    if (isListening) recognition.start();
    return () => recognition.stop();
  }, [isListening, setPrompt]);

  const toggleListening = () => setIsListening(prev => !prev);

  return (
    <div className='flex h-screen bg-[#0b0f1a] text-slate-200 overflow-hidden font-sans'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className='flex flex-col flex-1 relative'>
        {/* Mobile Header */}
        <div className='md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-10'>
          <button onClick={toggleSidebar} className='p-2 text-slate-400 hover:text-white transition-colors'>
            <GiHamburgerMenu size={24}/>
          </button>
          <span className='font-bold text-indigo-400'>ChatBot AI</span>
          <div className='w-8'></div> {/* Spacer */}
        </div>

        <Header/>

        {/* Chat Container */}
        {loading ? <LoadingScreen/> : (
          <div ref={messageContainerRef} className='flex-1 overflow-y-auto px-4 md:px-0 py-8 scroll-smooth custom-scrollbar'> 
            {messages?.length > 0 ? (
              <div className="space-y-8 max-w-3xl mx-auto pb-24">
                {messages.map((message, index) => (
                  <div key={index} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {/* User Message */}
                    <div className='flex gap-4 group'>
                      <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-2xl h-11 w-11 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <CgProfile className="text-white text-2xl"/>
                      </div>
                      <div className='bg-slate-800/50 border border-slate-700/50 rounded-2xl rounded-tl-none p-4 shadow-sm flex-1'>
                        <p className="text-slate-100 leading-relaxed">{message.question}</p>
                      </div>
                    </div>

                    {/* Bot Response */}
                    <div className='flex gap-4'>
                      <div className="flex-shrink-0 bg-slate-700 p-2.5 rounded-2xl h-11 w-11 flex items-center justify-center border border-slate-600 shadow-sm">
                        <FaRobot className="text-indigo-400 text-2xl"/>
                      </div>
                      <div 
                        className='bg-transparent rounded-2xl p-4 flex-1 prose prose-invert max-w-none text-slate-300 leading-7 tracking-wide'
                        dangerouslySetInnerHTML={createMarkup(message.answer)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Beautiful Empty State */
              <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center space-y-6">
                <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center animate-pulse">
                   <FaRobot className="text-5xl text-indigo-500 opacity-80"/>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">How can I help you today?</h2>
                  <p className="text-slate-400">Ask me about coding, science, or just have a friendly chat. I'm ready to assist!</p>
                </div>
                <div className="grid grid-cols-1 gap-3 w-full px-4">
                   <div className="p-3 bg-slate-800/40 border border-slate-700/50 rounded-xl text-sm text-slate-400 flex items-center gap-3">
                      <FaRegLightbulb className="text-yellow-500"/> "Explain Quantum Computing in simple terms"
                   </div>
                </div>
              </div>
            )}

            {newRequestLoading && (
              <div className="flex gap-4 max-w-3xl mx-auto mt-6 animate-pulse">
                <div className="flex-shrink-0 bg-slate-700 p-2.5 rounded-2xl h-11 w-11 flex items-center justify-center">
                  <FaRobot className="text-indigo-400 text-2xl"/>
                </div>
                <div className='bg-slate-800/30 rounded-2xl p-6 shadow-sm flex-1'>
                  <LoadingSmall/>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Floating Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-[#0b0f1a] via-[#0b0f1a]/90 to-transparent">
          <form 
            onSubmit={submitHandler} 
            className='flex items-center gap-3 max-w-3xl mx-auto bg-slate-800/80 backdrop-blur-xl p-2 pl-5 rounded-2xl border border-slate-700/50 shadow-2xl focus-within:border-indigo-500/50 transition-all duration-300'
          >
            <input 
              className='flex-grow bg-transparent py-3 text-slate-100 outline-none placeholder:text-slate-500 text-sm md:text-base'
              type="text" 
              placeholder='Ask your doubt...' 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            
            <div className="flex items-center gap-2">
              <button
                type="button" 
                onClick={toggleListening}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  isListening 
                    ? 'bg-red-500 text-white animate-bounce shadow-lg shadow-red-500/40' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
                disabled={newRequestLoading}
              >
                <FaMicrophone size={20} />
              </button>

              <button 
                type="submit"
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  prompt.trim() 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95' 
                    : 'text-slate-600 cursor-not-allowed'
                }`}
                disabled={!prompt.trim() || newRequestLoading}
              >
                <IoMdSend size={24}/>
              </button>
            </div>
          </form>
          <p className='text-[10px] text-center text-slate-500 mt-3 tracking-wide uppercase font-medium'>
            MERN AI Chatbot • Powered by Gemini
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React, { useState, useEffect, useRef } from 'react';
// import { GiHamburgerMenu } from "react-icons/gi";
// import { CgProfile } from "react-icons/cg";
// import { FaRobot } from "react-icons/fa";
// import { IoMdSend } from "react-icons/io";
// import Sidebar from '../Components/Sidebar';
// import Header from '../Components/Header';
// import { ChatData } from '../Context/ChatContext';
// import { LoadingScreen, LoadingSmall } from '../Components/Loading';

// import { FaMicrophone } from 'react-icons/fa'; //microphone option icon

// const Home = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isListening, setIsListening] = useState(false); //microphone

//   const { fetchResponse, messages, prompt, setPrompt, newRequestLoading, loading } = ChatData();
  
//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (prompt.trim()) fetchResponse();
//   };

//   const messageContainerRef = useRef();

//   useEffect(() => {
//     if(messageContainerRef.current){
//       messageContainerRef.current.scrollTo({
//         top: messageContainerRef.current.scrollHeight,
//         behavior: "smooth"
//       })
//     }
//   }, [messages]);

//   const createMarkup = (html) => {
//     // First handle code blocks
//     let formatted = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, 
//       '<pre class="bg-gray-800 p-4 rounded-md overflow-x-auto my-2"><code class="text-sm">$2</code></pre>'
//     );
    
//     // Handle bold text (**bold**)
//     formatted = formatted.replace(/\*\*(.*?)\*\*/g, 
//       '<strong class="font-semibold">$1</strong>'
//     );
    
//     // Handle italic text (*italic*)
//     formatted = formatted.replace(/\*(.*?)\*/g, 
//       '<em class="italic">$1</em>'
//     );
    
//     // Then handle inline code
//     formatted = formatted.replace(/`([^`]+)`/g, 
//       '<code class="bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
//     );
    
//     // Finally, convert remaining newlines to <br> tags
//     formatted = formatted.replace(/\n/g, '<br>');
    
//     return { __html: formatted };
//   };


//   //microphone
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       console.warn("Speech recognition not supported in this browser");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = 'en-US'; // Set language

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setPrompt(prev => prev ? `${prev} ${transcript}` : transcript);
//       setIsListening(false);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error", event.error);
//       setIsListening(false);
//     };

//     if (isListening) {
//       recognition.start();
//     }

//     return () => {
//       recognition.stop();
//     };
//   }, [isListening]);

//   const toggleListening = () => {
//     setIsListening(prev => !prev);
//   };

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

//         {/* Chat Container  change line 94*/ }
        
//         {loading ? <LoadingScreen/> : (<div ref = {messageContainerRef} className='bg-gray-850 flex-1 overflow-y-auto thin-scrollbar p-4 md:p-6'> 
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
//                     <div className="flex-shrink-0 bg-indigo-300 p-2 rounded-full h-10 w-10 flex items-center justify-center">
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
//         </div>)}

//         {/* Input Area */}
//         <div className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm p-4">
//         <form 
//           onSubmit={submitHandler} 
//           className='flex gap-2 max-w-3xl mx-auto'
//         >
//           <input 
//             className='flex-grow p-3 bg-gray-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all'
//             type="text" 
//             placeholder='Type or speak your doubt...' 
//             value={prompt} 
//             onChange={(e) => setPrompt(e.target.value)}
//             required
//             aria-label="Chat input"
//           />
//           <button
//             type="button" 
//             onClick={toggleListening}
//             className={`p-3 rounded-lg text-white transition-colors ${
//               isListening 
//                 ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
//                 : 'bg-gray-600 hover:bg-gray-700'
//             }`}
//             disabled={newRequestLoading}
//             aria-label={isListening ? "Stop listening" : "Start voice input"}
//           >
//             <FaMicrophone className="text-xl" />
//           </button>
//           <button 
//             type="submit"
//             className={`p-3 rounded-lg text-white transition-colors ${
//               prompt.trim() 
//                 ? 'bg-blue-600 hover:bg-blue-700' 
//                 : 'bg-gray-700 cursor-not-allowed'
//             }`}
//             disabled={!prompt.trim() || newRequestLoading}
//           >
//             <IoMdSend className="text-xl"/>
//           </button>
//         </form>
//           {/* <form 
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
//           </form> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

