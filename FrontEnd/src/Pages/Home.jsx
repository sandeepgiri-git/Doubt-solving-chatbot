import React, { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FaRobot, FaMicrophone, FaRegLightbulb } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { ChatData } from "../Context/ChatContext";
import { LoadingScreen, LoadingSmall } from "../Components/Loading";
import toast from "react-hot-toast";

const Typewriter = ({ text, delay = 10, createMarkup, onComplete }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const previousTextRef = useRef("");

  useEffect(() => {
    if (previousTextRef.current !== text) {
      setCurrentText("");
      setCurrentIndex(0);
      previousTextRef.current = text;
    }
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return (
    <div
      className="transition-all duration-200 break-words overflow-hidden"
      dangerouslySetInnerHTML={createMarkup(currentText)}
    />
  );
};

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    fetched,
    setFetched,
    loading,
  } = ChatData();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const submitHandler = (e) => {
    e.preventDefault();
    if (prompt.trim()) fetchResponse();
  };

  const messageContainerRef = useRef();

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, newRequestLoading, fetched]);

  const createMarkup = (html) => {
    let formatted = html.replace(
      /```(\w+)?\n([\s\S]*?)\n```/g,
      '<pre class="bg-[#0f172a] p-3 md:p-4 rounded-xl overflow-x-auto my-3 border border-slate-700/50 shadow-inner text-xs md:text-sm"><code class="text-pink-400 font-mono">$2</code></pre>'
    );
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-slate-300">$1</em>');
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-400 text-xs font-mono">$1</code>');
    formatted = formatted.replace(/\n/g, "<br>");
    return { __html: formatted };
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    if (isListening) recognition.start();
    return () => recognition.stop();
  }, [isListening, setPrompt]);

  const toggleListening = () => setIsListening((prev) => !prev);

  return (
    <div className="flex h-[100dvh] bg-[#0b0f1a] text-slate-200 overflow-hidden font-sans">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 relative w-full overflow-hidden">
        
        {/* Responsive Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 z-20">
          <button onClick={toggleSidebar} className="p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-lg">
            <GiHamburgerMenu size={22} />
          </button>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            ChatBot AI
          </h1>
          <div className="w-10"></div> {/* Spacer for symmetry */}
        </header>

        <div className="hidden md:block">
          <Header />
        </div>

        {loading ? (
          <LoadingScreen />
        ) : (
          <div
            ref={messageContainerRef}
            className="flex-1 overflow-y-auto px-4 py-6 md:py-8 scroll-smooth custom-scrollbar w-full"
          >
            {messages?.length > 0 ? (
              <div className="space-y-8 max-w-4xl mx-auto pb-32">
                {messages.map((message, index) => {
                  const isLastMessage = index === messages.length - 1;

                  return (
                    <div key={index} className="flex flex-col space-y-4 w-full">
                      {/* USER MESSAGE */}
                      <div className="flex flex-row-reverse gap-3 items-start animate-in slide-in-from-right-5 duration-300">
                        <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg h-9 w-9 md:h-10 md:w-10 flex items-center justify-center">
                          <CgProfile className="text-white text-lg md:text-xl" />
                        </div>
                        <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none p-3 md:p-4 shadow-md max-w-[85%] md:max-w-[70%] break-words overflow-hidden">
                          <p className="text-sm md:text-base leading-relaxed">
                            {message.question}
                          </p>
                        </div>
                      </div>

                      {/* BOT RESPONSE */}
                      {message.answer && (
                        <div className="flex gap-3 items-start animate-in slide-in-from-left-5 duration-500">
                          <div className="flex-shrink-0 bg-slate-800 border border-slate-700 p-2 rounded-xl h-9 w-9 md:h-10 md:w-10 flex items-center justify-center">
                            <FaRobot className="text-indigo-400 text-lg md:text-xl" />
                          </div>
                          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl rounded-tl-none p-3 md:p-4 flex-1 max-w-[85%] md:max-w-[85%] text-slate-300 break-words overflow-hidden">
                            {isLastMessage && fetched ? (
                              <Typewriter
                                key={`type-${index}`}
                                text={message.answer}
                                createMarkup={createMarkup}
                                onComplete={() => setFetched(false)}
                              />
                            ) : (
                              <div className="text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={createMarkup(message.answer)} />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {newRequestLoading && (
                  <div className="flex gap-3 items-start animate-pulse">
                    <div className="flex-shrink-0 bg-slate-800 p-2 rounded-xl border border-slate-700 h-9 w-9">
                      <FaRobot className="text-indigo-400" />
                    </div>
                    <div className="bg-slate-800/30 rounded-2xl p-4 shadow-sm">
                      <LoadingSmall />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="flex flex-col items-center justify-center h-full max-w-sm mx-auto text-center space-y-6 px-4">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-500/10 rounded-full flex items-center justify-center animate-pulse">
                  <FaRobot className="text-4xl md:text-5xl text-indigo-500 opacity-80" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">How can I help?</h2>
                  <p className="text-slate-400 text-sm md:text-base px-2">Ask me anything, I'm ready to assist!</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* INPUT AREA */}
        <div className="p-3 md:p-8 bg-gradient-to-t from-[#0b0f1a] via-[#0b0f1a]/95 to-transparent z-10">
          <form
            onSubmit={submitHandler}
            className="flex items-center gap-2 max-w-3xl mx-auto bg-slate-800/90 backdrop-blur-2xl p-1.5 md:p-2 pl-4 md:pl-5 rounded-2xl border border-slate-700/50 shadow-2xl focus-within:border-indigo-500/50 transition-all duration-300"
          >
            <input
              className="flex-grow bg-transparent py-2.5 md:py-3 text-slate-100 outline-none placeholder:text-slate-500 text-sm md:text-base min-w-0"
              type="text"
              placeholder="Message..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <div className="flex items-center gap-1 md:gap-2">
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2 md:p-2.5 rounded-xl transition-all ${
                  isListening ? "bg-red-500 text-white animate-bounce" : "text-slate-400 hover:text-white"
                }`}
              >
                <FaMicrophone size={18} />
              </button>
              <button
                type="submit"
                className={`p-2 md:p-2.5 rounded-xl transition-all ${
                  prompt.trim() ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-600"
                }`}
                disabled={!prompt.trim() || newRequestLoading}
              >
                <IoMdSend size={22} />
              </button>
            </div>
          </form>
          <p className="hidden md:block text-[10px] text-center text-slate-500 mt-3 tracking-widest uppercase">
             Powered by Gemini • MERN Stack AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React, { useState, useEffect, useRef } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { CgProfile } from "react-icons/cg";
// import { FaRobot, FaMicrophone, FaRegLightbulb } from "react-icons/fa";
// import { IoMdSend } from "react-icons/io";
// import Sidebar from "../Components/Sidebar";
// import Header from "../Components/Header";
// import { ChatData } from "../Context/ChatContext";
// import { LoadingScreen, LoadingSmall } from "../Components/Loading";
// import toast from "react-hot-toast";

// // --- ENHANCED TYPEWRITER COMPONENT ---
// const Typewriter = ({ text, delay = 10, createMarkup, onComplete }) => {
//   const [currentText, setCurrentText] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const previousTextRef = useRef("");

//   // Reset logic if text changes
//   useEffect(() => {
//     if (previousTextRef.current !== text) {
//       setCurrentText("");
//       setCurrentIndex(0);
//       previousTextRef.current = text;
//     }
//   }, [text]);

//   // Typing logic
//   useEffect(() => {
//     if (currentIndex < text.length) {
//       const timeout = setTimeout(() => {
//         setCurrentText((prev) => prev + text[currentIndex]);
//         setCurrentIndex((prev) => prev + 1);
//       }, delay);
//       return () => clearTimeout(timeout);
//     } else if (onComplete) {
//       // Logic: Once text is fully typed, notify parent to set fetched to false
//       onComplete();
//     }
//   }, [currentIndex, delay, text, onComplete]);

//   return (
//     <div
//       className="transition-all duration-200"
//       dangerouslySetInnerHTML={createMarkup(currentText)}
//     />
//   );
// };

// const Home = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isListening, setIsListening] = useState(false);

//   const {
//     fetchResponse,
//     messages,
//     prompt,
//     setPrompt,
//     newRequestLoading,
//     fetched,
//     setFetched,
//     loading,
//   } = ChatData();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (prompt.trim()) fetchResponse();
//   };

//   const messageContainerRef = useRef();

//   // Auto-scroll logic
//   useEffect(() => {
//     if (messageContainerRef.current) {
//       messageContainerRef.current.scrollTo({
//         top: messageContainerRef.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, [messages, newRequestLoading, fetched]);

//   const createMarkup = (html) => {
//     let formatted = html.replace(
//       /```(\w+)?\n([\s\S]*?)\n```/g,
//       '<pre class="bg-[#0f172a] p-4 rounded-xl overflow-x-auto my-3 border border-slate-700/50 shadow-inner"><code class="text-pink-400 text-sm font-mono">$2</code></pre>'
//     );
//     formatted = formatted.replace(
//       /\*\*(.*?)\*\*/g,
//       '<strong class="text-white font-bold">$1</strong>'
//     );
//     formatted = formatted.replace(
//       /\*(.*?)\*/g,
//       '<em class="italic text-slate-300">$1</em>'
//     );
//     formatted = formatted.replace(
//       /`([^`]+)`/g,
//       '<code class="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-400 text-sm font-mono">$1</code>'
//     );
//     formatted = formatted.replace(/\n/g, "<br>");
//     return { __html: formatted };
//   };

//   // Speech Recognition
//   useEffect(() => {
//     try {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (!SpeechRecognition) return;
//       const recognition = new SpeechRecognition();
//       recognition.continuous = false;
//       recognition.lang = "en-US";
//       // console.log("object")
//       recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         setPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
//         setIsListening(false);
//       };
//       recognition.onerror = () => setIsListening(false);
//       if (isListening) recognition.start();
//       return () => recognition.stop();
//     }
//     catch(e) {
//       toast.error("Microphone services is currently unavailable")
//       console.log(e)
//     }
//   }, [isListening, setPrompt]);

//   const toggleListening = () => setIsListening((prev) => !prev);

//   return (
//     <div className="flex h-screen bg-[#0b0f1a] text-slate-200 overflow-hidden font-sans">
//       <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

//       <div className="flex flex-col flex-1 relative">
//         <Header />

//         {loading ? (
//           <LoadingScreen />
//         ) : (
//           <div
//             ref={messageContainerRef}
//             className="flex-1 overflow-y-auto px-4 py-8 scroll-smooth custom-scrollbar"
//           >
//             {messages?.length > 0 ? (
//               <div className="space-y-10 max-w-4xl mx-auto pb-32">
//                 {messages.map((message, index) => {
//                   const isLastMessage = index === messages.length - 1;

//                   return (
//                     <div key={index} className="flex flex-col space-y-4">
//                       {/* --- USER MESSAGE (Always shows immediately) --- */}
//                       <div className="flex flex-row-reverse gap-3 items-start animate-in slide-in-from-right-5 duration-300">
//                         <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg">
//                           <CgProfile className="text-white text-xl" />
//                         </div>
//                         <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-none p-4 shadow-md max-w-[80%]">
//                           <p className="text-sm md:text-base">
//                             {message.question}
//                           </p>
//                         </div>
//                       </div>

//                       {/* --- BOT RESPONSE (Only shows if message.answer exists) --- */}
//                       {message.answer && (
//                         <div className="flex gap-3 items-start animate-in slide-in-from-left-5 duration-500">
//                           <div className="flex-shrink-0 bg-slate-800 border border-slate-700 p-2 rounded-xl">
//                             <FaRobot className="text-indigo-400 text-xl" />
//                           </div>
//                           <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl rounded-tl-none p-4 flex-1 prose prose-invert max-w-[90%] text-slate-300">
//                             {isLastMessage && fetched ? (
//                               <Typewriter
//                                 key={`type-${index}`}
//                                 text={message.answer}
//                                 createMarkup={createMarkup}
//                                 onComplete={() => setFetched(false)}
//                               />
//                             ) : (
//                               <div
//                                 dangerouslySetInnerHTML={createMarkup(
//                                   message.answer
//                                 )}
//                               />
//                             )}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}

//                 {/* --- BOT TYPING INDICATOR --- */}
//                 {newRequestLoading && (
//                   <div className="flex gap-3 items-start animate-pulse">
//                     <div className="flex-shrink-0 bg-slate-800 p-2 rounded-xl border border-slate-700">
//                       <FaRobot className="text-indigo-400 text-xl" />
//                     </div>
//                     <div className="bg-slate-800/30 rounded-2xl p-4 shadow-sm">
//                       <LoadingSmall />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               /* --- EMPTY STATE --- */
//               <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center space-y-6">
//                 <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center animate-pulse">
//                   <FaRobot className="text-5xl text-indigo-500 opacity-80" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-white mb-2">
//                     How can I help you?
//                   </h2>
//                   <p className="text-slate-400">
//                     Your MERN AI Assistant is ready.
//                   </p>
//                 </div>
//                 <div className="p-3 bg-slate-800/40 border border-slate-700/50 rounded-xl text-sm text-slate-400 flex items-center gap-3 w-full">
//                   <FaRegLightbulb className="text-yellow-500" /> "Explain React
//                   Hooks with an example"
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* --- INPUT AREA --- */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-[#0b0f1a] via-[#0b0f1a]/95 to-transparent z-10">
//           <form
//             onSubmit={submitHandler}
//             className="flex items-center gap-3 max-w-3xl mx-auto bg-slate-800/90 backdrop-blur-2xl p-2 pl-5 rounded-2xl border border-slate-700/50 shadow-2xl focus-within:border-indigo-500/50 transition-all duration-300"
//           >
//             <input
//               className="flex-grow bg-transparent py-3 text-slate-100 outline-none placeholder:text-slate-500 text-sm md:text-base"
//               type="text"
//               placeholder="Message ChatBot AI..."
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               required
//             />
//             <div className="flex items-center gap-2">
//               <button
//                 type="button"
//                 onClick={toggleListening}
//                 className={`p-2.5 rounded-xl transition-all ${
//                   isListening
//                     ? "bg-red-500 text-white animate-bounce shadow-lg shadow-red-500/40"
//                     : "text-slate-400 hover:text-white"
//                 }`}
//               >
//                 <FaMicrophone size={20} />
//               </button>
//               <button
//                 type="submit"
//                 className={`p-2.5 rounded-xl transition-all ${
//                   prompt.trim()
//                     ? "bg-indigo-600 text-white hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/20"
//                     : "text-slate-600 cursor-not-allowed"
//                 }`}
//                 disabled={!prompt.trim() || newRequestLoading}
//               >
//                 <IoMdSend size={24} />
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
