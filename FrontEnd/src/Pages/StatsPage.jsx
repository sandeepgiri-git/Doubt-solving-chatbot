import React from 'react';
import { FaChartBar, FaTrophy, FaClock, FaCheck, FaTimes, FaStar, FaCalendarAlt } from 'react-icons/fa';

const StatsPage = () => {
  // Sample data
  const statsData = {
    totalQuizzes: 24,
    averageScore: 78,
    highestScore: 95,
    averageTime: '12:45',
    accuracy: 82,
    categories: [
      { name: 'JavaScript', score: 85, attempts: 8 },
      { name: 'React', score: 79, attempts: 6 },
      { name: 'CSS', score: 72, attempts: 5 },
      { name: 'General Knowledge', score: 68, attempts: 5 }
    ],
    monthlyTrend: [65, 72, 78, 82, 85, 81, 79, 84, 88, 85, 82, 86],
    questionStats: {
      correct: 142,
      incorrect: 31,
      skipped: 12
    },
    streak: {
      current: 5,
      longest: 8
    }
  };

  // Calculate percentage for radial progress
  const radialProgress = (percent) => ({
    '--value': percent,
    '--size': '4rem',
    '--thickness': '6px'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <FaChartBar className="text-blue-500 mr-3" size={28} />
            <h1 className="text-3xl font-bold text-gray-800">Your Statistics</h1>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
            <FaCalendarAlt className="text-gray-400" />
            <span className="text-gray-600">Last 6 Months</span>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Quizzes */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Quizzes</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{statsData.totalQuizzes}</p>
              </div>
              <div className="radial-progress bg-blue-50 text-blue-500" style={radialProgress(100)}>
                <FaChartBar size={24} />
              </div>
            </div>
          </div>

          {/* Average Score */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Score</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{statsData.averageScore}%</p>
                <p className="text-xs text-gray-500 mt-1">+3% from last month</p>
              </div>
              <div className="radial-progress bg-green-50 text-green-500" style={radialProgress(statsData.averageScore)}>
                {statsData.averageScore}%
              </div>
            </div>
          </div>

          {/* Highest Score */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Highest Score</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{statsData.highestScore}%</p>
                <p className="text-xs text-gray-500 mt-1">JavaScript Fundamentals</p>
              </div>
              <div className="radial-progress bg-yellow-50 text-yellow-500" style={radialProgress(statsData.highestScore)}>
                <FaTrophy size={20} />
              </div>
            </div>
          </div>

          {/* Average Time */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Time</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{statsData.averageTime}</p>
                <p className="text-xs text-gray-500 mt-1">per quiz</p>
              </div>
              <div className="radial-progress bg-purple-50 text-purple-500" style={radialProgress(100)}>
                <FaClock size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Trend */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Trend</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              <p>Line chart showing: {statsData.monthlyTrend.join(', ')}</p>
            </div>
          </div>

          {/* Accuracy */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Question Accuracy</h2>
            <div className="flex justify-center">
              <div className="radial-progress bg-blue-50 text-blue-600" style={radialProgress(statsData.accuracy)}>
                {statsData.accuracy}%
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="flex items-center justify-center text-green-500">
                  <FaCheck className="mr-1" />
                  <span className="font-bold">{statsData.questionStats.correct}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Correct</p>
              </div>
              <div>
                <div className="flex items-center justify-center text-red-500">
                  <FaTimes className="mr-1" />
                  <span className="font-bold">{statsData.questionStats.incorrect}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Incorrect</p>
              </div>
              <div>
                <div className="flex items-center justify-center text-gray-400">
                  <span className="font-bold">{statsData.questionStats.skipped}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Skipped</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance by Category</h2>
            <div className="space-y-4">
              {statsData.categories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-gray-700">{category.name}</span>
                    <span className="font-medium">{category.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        category.score >= 80 ? 'bg-green-500' :
                        category.score >= 60 ? 'bg-blue-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">{category.attempts} attempts</span>
                    <span className="text-xs text-gray-500">
                      {category.score >= 80 ? 'Excellent' :
                       category.score >= 60 ? 'Good' : 'Needs work'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Streaks */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Streaks</h2>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-yellow-500 mb-2">{statsData.streak.current}</div>
                <p className="text-gray-600">Current streak</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-gray-500 mb-2">
                  <FaStar className="mr-2 text-yellow-400" />
                  <span className="text-xl font-bold">{statsData.streak.longest}</span>
                </div>
                <p className="text-gray-600">Longest streak</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;