
//Grok AI

import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { useUserData } from '../Context/UserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const {user,handleLogout} = useUserData();
    const [bio, setBio] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();

    const handleSave = () => {
        setIsEdit(false);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md flex-shrink-0">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Menu</h2>
                    <nav className="space-y-4">
                        <button onClick={()=>navigate("/stats")} className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-300">
                            <FaChartBar className="mr-3" />
                            <span>Stats</span>
                        </button>
                        <button onClick={()=>navigate("/settings")} className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-300">
                            <FaCog className="mr-3" />
                            <span>Settings</span>
                        </button>
                        <button onClick={() => handleLogout(navigate)} className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition duration-300">
                            <FaSignOutAlt className="mr-3" />
                            <span>Logout</span>
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="relative">
                            <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                            <div className="absolute -bottom-16 left-6">
                                <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden">
                                    <FiUser className="h-full w-full text-gray-800" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-20 px-6 pb-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{user.data.user.email}</h1>
                                    <p className="text-lg text-gray-600 mt-1">Senior Frontend Developer</p>
                                    <div className="flex items-center mt-4 space-x-4 text-gray-600">
                                        <div className="flex items-center">
                                            <FaMapMarkerAlt className="mr-2" />
                                            <span>Musakhedi, Indore</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaBriefcase className="mr-2" />
                                            <span>TechCorp Inc.</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaGraduationCap className="mr-2" />
                                            <span>IIST Collage</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-3">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                                        Contact
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300">
                                        Follow
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mt-5 flex-wrap">
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
                                    onClick={() => setIsEdit(true)}
                                > 
                                    Edit Bio
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
                                    onClick={handleSave}
                                    hidden={!isEdit}
                                > 
                                    Save 
                                </button>
                                <br />
                                <textarea 
                                    className='w-full resize-none h-32 p-2 border border-gray-300 rounded-lg'
                                    defaultValue={bio || "Not set yet"}
                                    disabled={!isEdit}
                                    onChange={(e) => setBio(e.target.value)}
                                    // cols={10}
                                />
                            </div>
                            
                            <div className="mt-6 flex space-x-4">
                                <a href="#" className="text-gray-500 hover:text-gray-900 transition duration-300">
                                    <FaGithub size={24} />
                                </a>
                                <a href="#" className="text-gray-500 hover:text-blue-600 transition duration-300">
                                    <FaLinkedin size={24} />
                                </a>
                                <a href="#" className="text-gray-500 hover:text-blue-400 transition duration-300">
                                    <FaTwitter size={24} />
                                </a>
                                <a href="#" className="text-gray-500 hover:text-red-500 transition duration-300">
                                    <FaEnvelope size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8">
                                <button className="border-b-2 border-blue-500 text-blue-600 py-4 px-1 text-sm font-medium">
                                    Overview
                                </button>
                                <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
                                    Projects
                                </button>
                                <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
                                    Experience
                                </button>
                                <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
                                    Education
                                </button>
                            </nav>
                        </div>
                    </div>
                    
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Current Company</h3>
                                        <p className="mt-1 text-gray-900">TechCorp Inc. (2019 - Present)</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Previous Companies</h3>
                                        <p className="mt-1 text-gray-900">WebSolutions (2015 - 2019), DigitalAgency (2013 - 2015)</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Education</h3>
                                        <p className="mt-1 text-gray-900">B.S. Computer Science, Stanford University (2009 - 2013)</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
                                <div className="flex flex-wrap gap-3">
                                    {['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Node.js', 'GraphQL', 'Redux', 'Jest', 'Git'].map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Stats</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <p className="text-2xl font-bold text-gray-900">42</p>
                                        <p className="text-sm text-gray-500">Projects</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <p className="text-2xl font-bold text-gray-900">3.5K</p>
                                        <p className="text-sm text-gray-500">Followers</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <p className="text-2xl font-bold text-gray-900">128</p>
                                        <p className="text-sm text-gray-500">Following</p>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                        <p className="text-2xl font-bold text-gray-900">8+</p>
                                        <p className="text-sm text-gray-500">Years Exp</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                                <div className="space-y-4">
                                    {[
                                        'Published article on React performance',
                                        'Contributed to open-source project',
                                        'Attended React Conf 2023',
                                        'Completed Advanced TypeScript course'
                                    ].map((activity, index) => (
                                        <div key={index} className="flex items-start">
                                            <div className="flex-shrink-0 h-2 w-2 mt-2 bg-blue-500 rounded-full"></div>
                                            <p className="ml-3 text-sm text-gray-700">{activity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

// import React from 'react';

// const SimpleProfilePage = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
//         {/* Profile Picture - Centered */}
//         <div className="flex justify-center">
//           <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden mb-4">
//             <img 
//               src="https://www.gravatar.com/avatar/default?s=200" 
//               alt="Profile"
//               className="h-full w-full object-cover"
//             />
//           </div>
//         </div>
        
//         {/* Basic Info */}
//         <div className="text-center">
//           <h1 className="text-xl font-semibold text-gray-800">John Doe</h1>
//           <p className="text-gray-600 mt-1">Web Developer</p>
//           <p className="text-gray-500 text-sm mt-2">San Francisco, CA</p>
//         </div>
        
//         {/* Minimal Bio */}
//         <div className="mt-6 border-t border-gray-100 pt-6">
//           <p className="text-gray-700 text-center">
//             Passionate about building web applications with clean code and great user experiences.
//           </p>
//         </div>
        
//         {/* Single Contact Button */}
//         <div className="mt-6 flex justify-center">
//           <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
//             Contact
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SimpleProfilePage;

// import React from 'react';
// import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
// import { FiUser } from 'react-icons/fi';
// import { useUserData } from '../Context/UserContext';
// import { useState } from 'react';

// const ProfilePage = () => {
//     const {user} = useUserData();

//     const [bio, setBio] = useState("");
//     const [isEdit, setIsEdit] = useState(false);

//     const handleSave  =() => {
//         setIsEdit(false);
//     }

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      
//       <div className="max-w-4xl mx-auto">
//         {/* Profile Header */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="relative">
//             {/* Cover Photo */}
//             <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            
//             {/* Profile Picture */}
//             <div className="absolute -bottom-16 left-6">
//               <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden">
//                 {/* <img 
//                   src="https://randomuser.me/api/portraits/women/44.jpg" 
//                   alt="Profile"
//                   className="h-full w-full object-cover"
//                 /> */}
//                 <FiUser className="h-full w-full text-gray-800" />
//               </div>
                
//             </div>
//           </div>
          
//           {/* Profile Info */}
//           <div className="pt-20 px-6 pb-6">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">{user.data.user.email}</h1>
//                 <p className="text-lg text-gray-600 mt-1">Senior Frontend Developer</p>
                
//                 <div className="flex items-center mt-4 space-x-4 text-gray-600">
//                   <div className="flex items-center">
//                     <FaMapMarkerAlt className="mr-2" />
//                     <span>Musakhedi, Indore</span>
//                   </div>
//                   <div className="flex items-center">
//                     <FaBriefcase className="mr-2" />
//                     <span>TechCorp Inc.</span>
//                   </div>
//                   <div className="flex items-center">
//                     <FaGraduationCap className="mr-2" />
//                     <span>IIST Collage</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex space-x-3">
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
//                   Contact
//                 </button>
//                 <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300">
//                   Follow
//                 </button>
//               </div>
//             </div>
            
//             {/* Bio */}
            

//             <div className="mt-5 flex-wrap">
//                 <button className=" px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
//                     onClick={() => setIsEdit(true)}
//                 > 
//                 Edit Bio
//                 </button>
//                 <button className=" px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
//                     onClick={handleSave}
//                     hidden={!isEdit}
//                 > 
//                 Save 
//                 </button>
//                 <br />
//                 <textarea 
//                 className='w-full'
//                 defaultValue={bio || "Not set yet"}
//                 disabled={!isEdit}
//                 />
//             </div>
            
//             {/* Social Links */}
//             <div className="mt-6 flex space-x-4">
//               <a href="#" className="text-gray-500 hover:text-gray-900 transition duration-300">
//                 <FaGithub size={24} />
//               </a>
//               <a href="#" className="text-gray-500 hover:text-blue-600 transition duration-300">
//                 <FaLinkedin size={24} />
//               </a>
//               <a href="#" className="text-gray-500 hover:text-blue-400 transition duration-300">
//                 <FaTwitter size={24} />
//               </a>
//               <a href="#" className="text-gray-500 hover:text-red-500 transition duration-300">
//                 <FaEnvelope size={24} />
//               </a>
//             </div>
//           </div>
//         </div>
        
//         {/* Content Tabs */}
//         <div className="mt-8">
//           <div className="border-b border-gray-200">
//             <nav className="-mb-px flex space-x-8">
//               <button className="border-b-2 border-blue-500 text-blue-600 py-4 px-1 text-sm font-medium">
//                 Overview
//               </button>
//               <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
//                 Projects
//               </button>
//               <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
//                 Experience
//               </button>
//               <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
//                 Education
//               </button>
//             </nav>
//           </div>
//         </div>
        
//         {/* Main Content */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Left Column */}
//           <div className="md:col-span-2 space-y-6">
//             {/* About */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500">Current Company</h3>
//                   <p className="mt-1 text-gray-900">TechCorp Inc. (2019 - Present)</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500">Previous Companies</h3>
//                   <p className="mt-1 text-gray-900">WebSolutions (2015 - 2019), DigitalAgency (2013 - 2015)</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-gray-500">Education</h3>
//                   <p className="mt-1 text-gray-900">B.S. Computer Science, Stanford University (2009 - 2013)</p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Skills */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
//               <div className="flex flex-wrap gap-3">
//                 {['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Node.js', 'GraphQL', 'Redux', 'Jest', 'Git'].map((skill) => (
//                   <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           {/* Right Column */}
//           <div className="space-y-6">
//             {/* Stats */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Stats</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="text-center p-3 bg-gray-50 rounded-lg">
//                   <p className="text-2xl font-bold text-gray-900">42</p>
//                   <p className="text-sm text-gray-500">Projects</p>
//                 </div>
//                 <div className="text-center p-3 bg-gray-50 rounded-lg">
//                   <p className="text-2xl font-bold text-gray-900">3.5K</p>
//                   <p className="text-sm text-gray-500">Followers</p>
//                 </div>
//                 <div className="text-center p-3 bg-gray-50 rounded-lg">
//                   <p className="text-2xl font-bold text-gray-900">128</p>
//                   <p className="text-sm text-gray-500">Following</p>
//                 </div>
//                 <div className="text-center p-3 bg-gray-50 rounded-lg">
//                   <p className="text-2xl font-bold text-gray-900">8+</p>
//                   <p className="text-sm text-gray-500">Years Exp</p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Recent Activity */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
//               <div className="space-y-4">
//                 {[
//                   'Published article on React performance',
//                   'Contributed to open-source project',
//                   'Attended React Conf 2023',
//                   'Completed Advanced TypeScript course'
//                 ].map((activity, index) => (
//                   <div key={index} className="flex items-start">
//                     <div className="flex-shrink-0 h-2 w-2 mt-2 bg-blue-500 rounded-full"></div>
//                     <p className="ml-3 text-sm text-gray-700">{activity}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;



// import React from 'react';
// import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
// import { FiUser } from 'react-icons/fi';
// import { useUserData } from '../Context/UserContext';
// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';

// const ProfilePage = () => {
//     const {user} = useUserData();
//     const [bio, setBio] = useState("");
//     const [isEdit, setIsEdit] = useState(false);

//     const handleSave = () => {
//         setIsEdit(false);
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 flex">
//             {/* Sidebar */}
//             <div className="w-64 bg-white shadow-md hidden md:block">
//                 <div className="p-4 border-b border-gray-200">
//                     <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
//                 </div>
//                 <nav className="p-4">
//                     <ul className="space-y-2">
//                         <li>
//                             <NavLink 
//                                 to="/stats" 
//                                 className={({isActive}) => `flex items-center p-3 rounded-lg ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
//                             >
//                                 <FaChartBar className="mr-3" />
//                                 <span>Stats</span>
//                             </NavLink>
//                         </li>
//                         <li>
//                             <NavLink 
//                                 to="/settings" 
//                                 className={({isActive}) => `flex items-center p-3 rounded-lg ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
//                             >
//                                 <FaCog className="mr-3" />
//                                 <span>Settings</span>
//                             </NavLink>
//                         </li>
//                         <li>
//                             <button className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100">
//                                 <FaSignOutAlt className="mr-3" />
//                                 <span>Logout</span>
//                             </button>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
//                 <div className="max-w-4xl mx-auto">
//                     {/* Profile Header */}
//                     <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                         <div className="relative">
//                             {/* Cover Photo */}
//                             <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                            
//                             {/* Profile Picture */}
//                             <div className="absolute -bottom-16 left-6">
//                                 <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden">
//                                     <FiUser className="h-full w-full text-gray-800" />
//                                 </div>
//                             </div>
//                         </div>
                        
//                         {/* Profile Info */}
//                         <div className="pt-20 px-6 pb-6">
//                             <div className="flex justify-between items-start">
//                                 <div>
//                                     <h1 className="text-3xl font-bold text-gray-900">{user.data.user.email}</h1>
//                                     <p className="text-lg text-gray-600 mt-1">Senior Frontend Developer</p>
                                    
//                                     <div className="flex items-center mt-4 space-x-4 text-gray-600">
//                                         <div className="flex items-center">
//                                             <FaMapMarkerAlt className="mr-2" />
//                                             <span>Musakhedi, Indore</span>
//                                         </div>
//                                         <div className="flex items-center">
//                                             <FaBriefcase className="mr-2" />
//                                             <span>TechCorp Inc.</span>
//                                         </div>
//                                         <div className="flex items-center">
//                                             <FaGraduationCap className="mr-2" />
//                                             <span>IIST Collage</span>
//                                         </div>
//                                     </div>
//                                 </div>
                                
//                                 <div className="flex space-x-3">
//                                     <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
//                                         Contact
//                                     </button>
//                                     <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300">
//                                         Follow
//                                     </button>
//                                 </div>
//                             </div>
                            
//                             {/* Bio */}
//                             <div className="mt-5 flex-wrap">
//                                 <button 
//                                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
//                                     onClick={() => setIsEdit(true)}
//                                 > 
//                                     Edit Bio
//                                 </button>
//                                 <button 
//                                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
//                                     onClick={handleSave}
//                                     hidden={!isEdit}
//                                 > 
//                                     Save 
//                                 </button>
//                                 <br />
//                                 <textarea 
//                                     className='w-full mt-2 p-2 border border-gray-300 rounded-lg'
//                                     defaultValue={bio || "Not set yet"}
//                                     disabled={!isEdit}
//                                     onChange={(e) => setBio(e.target.value)}
//                                 />
//                             </div>
                            
//                             {/* Social Links */}
//                             <div className="mt-6 flex space-x-4">
//                                 <a href="#" className="text-gray-500 hover:text-gray-900 transition duration-300">
//                                     <FaGithub size={24} />
//                                 </a>
//                                 <a href="#" className="text-gray-500 hover:text-blue-600 transition duration-300">
//                                     <FaLinkedin size={24} />
//                                 </a>
//                                 <a href="#" className="text-gray-500 hover:text-blue-400 transition duration-300">
//                                     <FaTwitter size={24} />
//                                 </a>
//                                 <a href="#" className="text-gray-500 hover:text-red-500 transition duration-300">
//                                     <FaEnvelope size={24} />
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
                    
//                     {/* Content Tabs */}
//                     <div className="mt-8">
//                         <div className="border-b border-gray-200">
//                             <nav className="-mb-px flex space-x-8">
//                                 <button className="border-b-2 border-blue-500 text-blue-600 py-4 px-1 text-sm font-medium">
//                                     Overview
//                                 </button>
//                                 <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
//                                     Projects
//                                 </button>
//                                 <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
//                                     Experience
//                                 </button>
//                                 <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
//                                     Education
//                                 </button>
//                             </nav>
//                         </div>
//                     </div>
                    
//                     {/* Main Content */}
//                     <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//                         {/* Left Column */}
//                         <div className="md:col-span-2 space-y-6">
//                             {/* About */}
//                             <div className="bg-white rounded-xl shadow-md p-6">
//                                 <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <h3 className="text-sm font-medium text-gray-500">Current Company</h3>
//                                         <p className="mt-1 text-gray-900">TechCorp Inc. (2019 - Present)</p>
//                                     </div>
//                                     <div>
//                                         <h3 className="text-sm font-medium text-gray-500">Previous Companies</h3>
//                                         <p className="mt-1 text-gray-900">WebSolutions (2015 - 2019), DigitalAgency (2013 - 2015)</p>
//                                     </div>
//                                     <div>
//                                         <h3 className="text-sm font-medium text-gray-500">Education</h3>
//                                         <p className="mt-1 text-gray-900">B.S. Computer Science, Stanford University (2009 - 2013)</p>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             {/* Skills */}
//                             <div className="bg-white rounded-xl shadow-md p-6">
//                                 <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
//                                 <div className="flex flex-wrap gap-3">
//                                     {['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Node.js', 'GraphQL', 'Redux', 'Jest', 'Git'].map((skill) => (
//                                         <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
//                                             {skill}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
                        
//                         {/* Right Column */}
//                         <div className="space-y-6">
//                             {/* Stats */}
//                             <div className="bg-white rounded-xl shadow-md p-6">
//                                 <h2 className="text-xl font-semibold text-gray-900 mb-4">Stats</h2>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div className="text-center p-3 bg-gray-50 rounded-lg">
//                                         <p className="text-2xl font-bold text-gray-900">42</p>
//                                         <p className="text-sm text-gray-500">Projects</p>
//                                     </div>
//                                     <div className="text-center p-3 bg-gray-50 rounded-lg">
//                                         <p className="text-2xl font-bold text-gray-900">3.5K</p>
//                                         <p className="text-sm text-gray-500">Followers</p>
//                                     </div>
//                                     <div className="text-center p-3 bg-gray-50 rounded-lg">
//                                         <p className="text-2xl font-bold text-gray-900">128</p>
//                                         <p className="text-sm text-gray-500">Following</p>
//                                     </div>
//                                     <div className="text-center p-3 bg-gray-50 rounded-lg">
//                                         <p className="text-2xl font-bold text-gray-900">8+</p>
//                                         <p className="text-sm text-gray-500">Years Exp</p>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             {/* Recent Activity */}
//                             <div className="bg-white rounded-xl shadow-md p-6">
//                                 <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
//                                 <div className="space-y-4">
//                                     {[
//                                         'Published article on React performance',
//                                         'Contributed to open-source project',
//                                         'Attended React Conf 2023',
//                                         'Completed Advanced TypeScript course'
//                                     ].map((activity, index) => (
//                                         <div key={index} className="flex items-start">
//                                             <div className="flex-shrink-0 h-2 w-2 mt-2 bg-blue-500 rounded-full"></div>
//                                             <p className="ml-3 text-sm text-gray-700">{activity}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;


