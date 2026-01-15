import React from 'react';
import { FaHistory, FaChartLine, FaTrophy, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const HistoryPage = () => {
  // Sample history data
  const historyData = [
    { 
      id: 1,
      quizName: 'JavaScript Fundamentals', 
      date: '2023-05-15',
      score: 85,
      totalQuestions: 20,
      correctAnswers: 17,
      timeSpent: '12:45',
      category: 'Programming',
      difficulty: 'Medium'
    },
    { 
      id: 2,
      quizName: 'React Advanced Concepts', 
      date: '2023-05-10',
      score: 92,
      totalQuestions: 15,
      correctAnswers: 14,
      timeSpent: '18:30',
      category: 'Programming',
      difficulty: 'Hard'
    },
    { 
      id: 3,
      quizName: 'CSS Mastery', 
      date: '2023-05-05',
      score: 78,
      totalQuestions: 25,
      correctAnswers: 20,
      timeSpent: '22:15',
      category: 'Design',
      difficulty: 'Medium'
    },
    { 
      id: 4,
      quizName: 'General Knowledge', 
      date: '2023-04-28',
      score: 65,
      totalQuestions: 30,
      correctAnswers: 20,
      timeSpent: '15:00',
      category: 'Trivia',
      difficulty: 'Easy'
    },
  ];

  // Calculate performance trend
  const performanceTrend = historyData.map(item => item.score);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <FaHistory className="text-purple-500 mr-3" size={28} />
            <h1 className="text-3xl font-bold text-gray-800">Quiz History</h1>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
              Last 30 Days
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
              By Category
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
              All Time
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
            <div className="p-3 bg-blue-50 rounded-full mr-4">
              <FaChartLine className="text-blue-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Score</p>
              <p className="text-xl font-semibold text-gray-800">80%</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
            <div className="p-3 bg-green-50 rounded-full mr-4">
              <FaCheckCircle className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Quizzes Taken</p>
              <p className="text-xl font-semibold text-gray-800">{historyData.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
            <div className="p-3 bg-yellow-50 rounded-full mr-4">
              <FaTrophy className="text-yellow-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Highest Score</p>
              <p className="text-xl font-semibold text-gray-800">92%</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
            <div className="p-3 bg-purple-50 rounded-full mr-4">
              <FaClock className="text-purple-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Time</p>
              <p className="text-xl font-semibold text-gray-800">17:08</p>
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Performance Trend</h2>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm bg-white">
              <option>Last 5 Quizzes</option>
              <option>Last 10 Quizzes</option>
              <option>All Quizzes</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            <p>Chart visualization would go here</p>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historyData.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{quiz.quizName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(quiz.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {quiz.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {quiz.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              quiz.score >= 90 ? 'bg-green-500' :
                              quiz.score >= 70 ? 'bg-blue-500' :
                              'bg-red-500'
                            }`} 
                            style={{ width: `${quiz.score}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">{quiz.score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-purple-600 hover:text-purple-900">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;