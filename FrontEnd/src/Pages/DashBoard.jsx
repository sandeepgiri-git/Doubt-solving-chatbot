import { useState } from 'react';
import { FiMenu, FiX, FiUser, FiLogIn, FiMessageSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../Context/UserContext';
import { ProfileDropdown } from '../Components/ProfileBtn';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isAuth} = useUserData();
  // const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    navigate("/login")
  }

  const handleChatbot = () => {
    navigate("/home");
  }

  const handleQuiz = () => {
    navigate("/quizpage");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo/Title */}
            <div className="flex items-center">
              <FiMessageSquare className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">ChatBot AI</span>
            </div>

            {isAuth ? (<div className="flex justify-between h-16 w-2xs">
              <button 
                  onClick={handleQuiz}
                  className="text-gray-800 hover:text-gray-500 hover:underline px-3 py-2 text-lg "
                >
                  Quiz
                </button>
                <button onClick={handleChatbot} className="text-gray-800 hover:underline hover:text-gray-500 px-3 py-2 text-lg ">
                  ChatBot
                </button>
            </div>) : <p></p>}

            {/* Desktop Navigation (right-aligned) */}
            {isAuth ? <ProfileDropdown/> : (<div className="hidden md:flex items-center space-x-4">
              
              <button 
                onClick={handleLogin}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
              >
                <FiLogIn className="mr-2" />
                Login
              </button>
            </div>)}

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100">
                Features
              </button>
              <button className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100">
                Pricing
              </button>
              <button 
                onClick={handleLogin}
                className="block w-full text-left px-3 py-2 text-indigo-600 hover:bg-indigo-50"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Intelligent <span className="text-indigo-600">ChatBot</span> Solution
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Experience next-generation AI conversations with our powerful chatbot technology. 
            Get instant answers, 24/7 support, and personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuth ? "" : (<button 
              onClick={handleLogin}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 text-lg font-medium flex items-center justify-center"
            >
              <FiUser className="mr-2" />
              Get Started - It's Free
            </button>)}
            <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 text-lg font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our ChatBot?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "24/7 Availability",
                description: "Our chatbot never sleeps, providing instant responses anytime you need help."
              },
              {
                title: "Multi-Language Support",
                description: "Communicate in multiple languages with seamless translation."
              },
              {
                title: "Smart Learning",
                description: "The AI learns from interactions to provide better responses over time."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-indigo-600 text-2xl font-bold mb-3">{index + 1}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Login Modal
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX size={24} />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign up
                </button>
              </p>
            </div>
          </div> */}
        {/* </div> */}
      {/* )} */}
    </div>
  );
};

export default Dashboard;