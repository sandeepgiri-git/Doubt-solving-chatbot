import { useState } from 'react';
import { FiMenu, FiX, FiUser, FiLogIn, FiMessageSquare, FiZap, FiGlobe, FiCpu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../Context/UserContext';
import { ProfileDropdown } from '../Components/ProfileBtn';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuth } = useUserData();

  const handleLogin = () => navigate("/login");
  const handleChatbot = () => navigate("/home");
  const handleQuiz = () => navigate("/quizpage");

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-200 selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate("/")}>
              <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                <FiMessageSquare className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                ChatBot AI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {isAuth && (
                <div className="flex items-center gap-6">
                  {/* <button onClick={handleQuiz} className="text-slate-400 hover:text-white transition-colors font-medium">
                    Quiz Arena
                  </button> */}
                  <button onClick={handleChatbot} className="text-slate-400 hover:text-white transition-colors font-medium">
                    AI Chat
                  </button>
                </div>
              )}
              
              {isAuth ? (
                <ProfileDropdown />
              ) : (
                <button 
                  onClick={handleLogin}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                  <FiLogIn />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-400 hover:text-white">
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0f172a] border-b border-slate-800 animate-in fade-in slide-in-from-top-4">
            <div className="px-4 pt-2 pb-6 space-y-3">
              {isAuth ? (
                <>
                  <button onClick={handleChatbot} className="block w-full text-left p-3 text-slate-300 hover:bg-slate-800 rounded-lg">AI Chatbot</button>
                  <button onClick={handleQuiz} className="block w-full text-left p-3 text-slate-300 hover:bg-slate-800 rounded-lg">Quiz Arena</button>
                </>
              ) : (
                <button onClick={handleLogin} className="block w-full text-center p-3 bg-indigo-600 text-white rounded-lg">Login</button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Animated Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6 animate-bounce">
             <FiZap /> <span>Now powered by Gemini AI</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
            Intelligence that <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Understands You.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience the next frontier of MERN-stack AI. Get instant answers, 
            interactive quizzes, and a personalized learning companion available 24/7.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!isAuth ? (
              <button 
                onClick={handleLogin}
                className="bg-white text-black px-10 py-4 rounded-2xl hover:bg-slate-200 text-lg font-bold flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95"
              >
                <FiUser /> Get Started for Free
              </button>
            ) : (
              <button 
                onClick={handleChatbot}
                className="bg-indigo-600 text-white px-10 py-4 rounded-2xl hover:bg-indigo-500 text-lg font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
              >
                Go to Chatbot
              </button>
            )}
            <button className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white px-10 py-4 rounded-2xl hover:bg-slate-800 transition-all text-lg font-bold">
              View Features
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Engineered for Excellence</h2>
            <div className="h-1.5 w-20 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiZap className="text-yellow-400" />,
                title: "Instant Responses",
                description: "Experience lightning-fast AI interactions with minimal latency and high accuracy."
              },
              {
                icon: <FiGlobe className="text-blue-400" />,
                title: "Global Context",
                description: "Deep understanding of multiple topics, from coding logic to general knowledge."
              },
              {
                icon: <FiCpu className="text-indigo-400" />,
                title: "Smart Learning",
                description: "Our MERN integration ensures your conversation history is saved and synced seamlessly."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group bg-slate-800/30 border border-slate-700/50 p-8 rounded-[2rem] hover:bg-slate-800/60 transition-all hover:-translate-y-2 duration-300"
              >
                <div className="bg-slate-900 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 border border-slate-700 group-hover:border-indigo-500/50 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-10 text-center border-t border-slate-800/50">
        <p className="text-slate-500 text-sm tracking-widest uppercase font-semibold">
          Built with MERN Stack • Tailwind CSS • Gemini AI
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;

// import { useState } from 'react';
// import { FiMenu, FiX, FiUser, FiLogIn, FiMessageSquare } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
// import { useUserData } from '../Context/UserContext';
// import { ProfileDropdown } from '../Components/ProfileBtn';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const {isAuth} = useUserData();
//   // const [showLoginModal, setShowLoginModal] = useState(false);

//   const handleLogin = () => {
//     navigate("/login")
//   }

//   const handleChatbot = () => {
//     navigate("/home");
//   }

//   const handleQuiz = () => {
//     navigate("/quizpage");
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Navbar */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             {/* Logo/Title */}
//             <div className="flex items-center">
//               <FiMessageSquare className="h-6 w-6 text-indigo-600" />
//               <span className="ml-2 text-xl font-semibold text-gray-900">ChatBot AI</span>
//             </div>

//             {isAuth ? (<div className="flex justify-between h-16 w-2xs">
//               <button 
//                   onClick={handleQuiz}
//                   className="text-gray-800 hover:text-gray-500 hover:underline px-3 py-2 text-lg "
//                 >
//                   Quiz
//                 </button>
//                 <button onClick={handleChatbot} className="text-gray-800 hover:underline hover:text-gray-500 px-3 py-2 text-lg ">
//                   ChatBot
//                 </button>
//             </div>) : <p></p>}

//             {/* Desktop Navigation (right-aligned) */}
//             {isAuth ? <ProfileDropdown/> : (<div className="hidden md:flex items-center space-x-4">
              
//               <button 
//                 onClick={handleLogin}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
//               >
//                 <FiLogIn className="mr-2" />
//                 Login
//               </button>
//             </div>)}

//             {/* Mobile menu button */}
//             <div className="md:hidden flex items-center">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="text-gray-500 hover:text-gray-700 focus:outline-none"
//               >
//                 {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white shadow-lg">
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               <button className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100">
//                 Features
//               </button>
//               <button className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100">
//                 Pricing
//               </button>
//               <button 
//                 onClick={handleLogin}
//                 className="block w-full text-left px-3 py-2 text-indigo-600 hover:bg-indigo-50"
//               >
//                 Login
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
//         <div className="text-center">
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//             Your Intelligent <span className="text-indigo-600">ChatBot</span> Solution
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
//             Experience next-generation AI conversations with our powerful chatbot technology. 
//             Get instant answers, 24/7 support, and personalized assistance.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             {isAuth ? "" : (<button 
//               onClick={handleLogin}
//               className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 text-lg font-medium flex items-center justify-center"
//             >
//               <FiUser className="mr-2" />
//               Get Started - It's Free
//             </button>)}
//             <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 text-lg font-medium">
//               Learn More
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="bg-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our ChatBot?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "24/7 Availability",
//                 description: "Our chatbot never sleeps, providing instant responses anytime you need help."
//               },
//               {
//                 title: "Multi-Language Support",
//                 description: "Communicate in multiple languages with seamless translation."
//               },
//               {
//                 title: "Smart Learning",
//                 description: "The AI learns from interactions to provide better responses over time."
//               }
//             ].map((feature, index) => (
//               <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
//                 <div className="text-indigo-600 text-2xl font-bold mb-3">{index + 1}</div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;