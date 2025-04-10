import React from 'react';
import { FaPlay, FaTrophy, FaHistory, FaChartBar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const QuizPage = () => {
  // Card data
  const cards = [
    {
      title: "Start Quiz",
      icon: <FaPlay className="text-blue-500" size={24} />,
      description: "Begin a new quiz challenge",
      bgColor: "bg-blue-50",
      link: "/quiz"
    },
    {
      title: "Leaderboard",
      icon: <FaTrophy className="text-yellow-500" size={24} />,
      description: "See top performers",
      bgColor: "bg-yellow-50",
      link: "/leaderboard"
    },
    {
      title: "History",
      icon: <FaHistory className="text-purple-500" size={24} />,
      description: "View your past attempts",
      bgColor: "bg-purple-50",
      link: "/history"
    },
    {
      title: "Stats",
      icon: <FaChartBar className="text-green-500" size={24} />,
      description: "Check your progress",
      bgColor: "bg-green-50",
      link: "/stats"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Quiz Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <NavLink
              key={index}
              to={card.link}
              className={`${card.bgColor} rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition duration-300 transform hover:-translate-y-1`}
            >
              <div className="mb-4 p-3 bg-white rounded-full shadow-sm">
                {card.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
            </NavLink>
          ))}
        </div>

        {/* Additional content can be added below */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <p className="text-gray-600">You completed 3 quizzes this week!</p>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;