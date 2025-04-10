import React from 'react';
import { FaTrophy, FaCrown, FaMedal, FaUser } from 'react-icons/fa';

const LeaderboardPage = () => {
  // Sample leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Alex Johnson', score: 9850, avatar: 'https://randomuser.me/api/portraits/men/32.jpg', progress: 95 },
    { rank: 2, name: 'Sarah Williams', score: 8720, avatar: 'https://randomuser.me/api/portraits/women/44.jpg', progress: 87 },
    { rank: 3, name: 'Michael Chen', score: 8450, avatar: 'https://randomuser.me/api/portraits/men/67.jpg', progress: 84 },
    { rank: 4, name: 'Emma Davis', score: 7980, avatar: 'https://randomuser.me/api/portraits/women/28.jpg', progress: 79 },
    { rank: 5, name: 'David Kim', score: 7650, avatar: 'https://randomuser.me/api/portraits/men/75.jpg', progress: 76 },
    { rank: 6, name: 'Olivia Martinez', score: 7320, avatar: 'https://randomuser.me/api/portraits/women/63.jpg', progress: 73 },
    { rank: 7, name: 'James Wilson', score: 6980, avatar: 'https://randomuser.me/api/portraits/men/19.jpg', progress: 69 },
    { rank: 8, name: 'Sophia Brown', score: 6540, avatar: 'https://randomuser.me/api/portraits/women/34.jpg', progress: 65 },
    { rank: 9, name: 'Robert Taylor', score: 6210, avatar: 'https://randomuser.me/api/portraits/men/42.jpg', progress: 62 },
    { rank: 10, name: 'Ava Anderson', score: 5870, avatar: 'https://randomuser.me/api/portraits/women/56.jpg', progress: 58 },
  ];

  // Get medal icon based on rank
  const getMedalIcon = (rank) => {
    switch(rank) {
      case 1: return <FaCrown className="text-yellow-400" size={20} />;
      case 2: return <FaMedal className="text-gray-300" size={20} />;
      case 3: return <FaMedal className="text-yellow-600" size={20} />;
      default: return <span className="text-gray-500 font-medium">{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaTrophy className="text-yellow-500 mr-3" size={28} />
            Leaderboard
          </h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              This Week
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              All Time
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-700">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-6">Player</div>
            <div className="col-span-3 text-center">Progress</div>
            <div className="col-span-2 text-right">Score</div>
          </div>

          {/* Table Rows */}
          {leaderboardData.map((user) => (
            <div key={user.rank} className="grid grid-cols-12 items-center p-4 border-b border-gray-100 hover:bg-gray-50">
              <div className="col-span-1 flex justify-center">
                {getMedalIcon(user.rank)}
              </div>
              <div className="col-span-6 flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-4">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <FaUser className="h-full w-full p-2 text-gray-400" />
                  )}
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="col-span-3">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      user.rank === 1 ? 'bg-yellow-400' : 
                      user.rank === 2 ? 'bg-gray-300' : 
                      user.rank === 3 ? 'bg-yellow-600' : 'bg-blue-500'
                    }`} 
                    style={{ width: `${user.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="col-span-2 text-right font-semibold text-gray-800">
                {user.score.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Current User Position (example) */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 overflow-hidden mr-4 flex items-center justify-center">
                <FaUser className="text-blue-500" size={18} />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Your Position</h3>
                <p className="text-sm text-gray-600">Keep playing to move up!</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block font-bold text-gray-800">#15</span>
              <span className="block text-sm text-gray-600">4,320 points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;