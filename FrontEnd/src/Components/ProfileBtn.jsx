import { useState, useRef, useEffect } from 'react';
import { FiUser, FiLogOut, FiChevronDown, FiSettings } from 'react-icons/fi';
import { useUserData } from '../Context/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { handleLogout, user } = useUserData();
  const navigate = useNavigate();

  // Safely get email or default value
  const email = user?.data?.user?.email || user?.email || "User Account";

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
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 border focus:outline-none 
          ${isOpen 
            ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]' 
            : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
          }`}
        id="user-menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-inner">
          <FiUser size={18} />
        </div>
        <FiChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-3 w-56 rounded-2xl shadow-2xl py-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 ring-1 ring-white/10 z-50 animate-in fade-in zoom-in-95 duration-200"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          {/* User Info Section */}
          <div className="px-4 py-3 mb-1 border-b border-slate-800 bg-slate-800/30 rounded-t-2xl">
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Signed in as</p>
            <p className="text-sm font-medium text-slate-200 truncate">{email}</p>
          </div>

          <div className="px-1">
            <NavLink
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="group px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-indigo-600/10 rounded-xl flex items-center transition-all"
              role="menuitem"
            >
              <FiUser className="mr-3 text-lg group-hover:text-indigo-400" /> 
              <span>My Profile</span>
            </NavLink>

            <button
              onClick={() => {
                setIsOpen(false);
                // Add your settings logic here if needed
              }}
              className="group w-full text-left px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-indigo-600/10 rounded-xl flex items-center transition-all"
              role="menuitem"
            >
              <FiSettings className="mr-3 text-lg group-hover:text-indigo-400" /> 
              <span>Settings</span>
            </button>
          </div>

          <div className="px-1 mt-1 pt-1 border-t border-slate-800">
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout(navigate);
              }}
              className="group w-full text-left px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl flex items-center transition-all"
              role="menuitem"
            >
              <FiLogOut className="mr-3 text-lg group-hover:translate-x-1 transition-transform" /> 
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// import { useState, useRef, useEffect } from 'react';
// import { FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
// import { useUserData } from '../Context/UserContext';
// import { NavLink, useNavigate } from 'react-router-dom';

// export const ProfileDropdown = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const { handleLogout, user } = useUserData();
//   const navigate = useNavigate();

//   // Safely get email or default value
//   const email = user?.data?.user?.email || user?.email || "loading...";

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

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