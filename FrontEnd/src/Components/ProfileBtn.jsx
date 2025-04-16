// import { useState, useRef, useEffect } from 'react';
// import { FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
// import { useUserData } from '../Context/UserContext';
// // import axios from 'axios';
// // import { server } from '../main';
// import { NavLink, useNavigate } from 'react-router-dom';

// export const ProfileDropdown = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const {handleLogout} = useUserData();
//   const {user} = useUserData();
//   const [email,setEmail] = useState("");
//   const navigate = useNavigate();
//   // Close dropdown when clicking outside

//   // console.log(user);
  
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
    
//     setEmail(user?.data?.user?.email || "loading...");

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

  
//   console.log(user);

//   return (
//     <div className="relative ml-4 mt-4" ref={dropdownRef}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-base hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         id="user-menu"
//         aria-haspopup="true"
//         aria-expanded={isOpen}
//       >
//         <FiUser className="w-6 h-6" />
//         <FiChevronDown className="w-4 h-4" />
//       </button>

//       {isOpen && (
//         <div
//           className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
//           role="menu"
//           aria-orientation="vertical"
//           aria-labelledby="user-menu"
//         >
//           <div className="px-4 py-3 border-b">
//             {/* <p className="text-sm text-gray-900">John Doe</p> */}
//             <p className="text-sm font-medium text-gray-500 truncate">{email}</p>
//           </div>

//           <NavLink
//             to="/profile"
//             className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
//             role="menuitem"
//           >
//             <FiUser className="mr-2" /> Profile
//           </NavLink>

//           <button
//             onClick={() => handleLogout(navigate)}
//             className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
//             role="menuitem"
//           >
//             <FiLogOut className="mr-2" /> Sign out
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };


import { useState, useRef, useEffect } from 'react';
import { FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { useUserData } from '../Context/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { handleLogout, user } = useUserData();
  const navigate = useNavigate();

  // Safely get email or default value
  const email = user?.data?.user?.email || user?.email || "loading...";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative ml-4 mt-4" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-base hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        id="user-menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <FiUser className="w-6 h-6" />
        <FiChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium text-gray-500 truncate">{email}</p>
          </div>

          <NavLink
            to="/profile"
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            role="menuitem"
          >
            <FiUser className="mr-2" /> Profile
          </NavLink>

          <button
            onClick={() => handleLogout(navigate)}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            role="menuitem"
          >
            <FiLogOut className="mr-2" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
};