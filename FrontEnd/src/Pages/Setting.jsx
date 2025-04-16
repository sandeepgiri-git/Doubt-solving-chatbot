import React, { useState } from 'react';
import { FaUser, FaLock, FaBell, FaPalette, FaGlobe, FaSignOutAlt } from 'react-icons/fa';
import { FiUser, FiMail, FiCalendar } from 'react-icons/fi';

const SettingsPage = () => {
  // Form states
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [dob, setDob] = useState('1990-01-01');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('GMT+5:30');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a href="#profile" className="flex items-center p-3 rounded-lg bg-blue-50 text-blue-600">
                <FaUser className="mr-3" />
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#security" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                <FaLock className="mr-3" />
                <span>Security</span>
              </a>
            </li>
            <li>
              <a href="#notifications" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                <FaBell className="mr-3" />
                <span>Notifications</span>
              </a>
            </li>
            <li>
              <a href="#appearance" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                <FaPalette className="mr-3" />
                <span>Appearance</span>
              </a>
            </li>
            <li>
              <a href="#language" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                <FaGlobe className="mr-3" />
                <span>Language & Region</span>
              </a>
            </li>
            <li className="pt-4 mt-4 border-t border-gray-200">
              <button className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50">
                <FaSignOutAlt className="mr-3" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>

          {/* Profile Section */}
          <section id="profile" className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <FaUser className="mr-2" />
                Profile Information
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </section>

          {/* Security Section */}
          <section id="security" className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <FaLock className="mr-2" />
              Security Settings
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Update Password
                </button>
              </div>
            </form>
          </section>

          {/* Notifications Section */}
          <section id="notifications" className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <FaBell className="mr-2" />
              Notification Preferences
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive email notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Appearance Section */}
          <section id="appearance" className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <FaPalette className="mr-2" />
              Appearance
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Dark Mode</h3>
                  <p className="text-sm text-gray-600">Switch between light and dark theme</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Language & Region Section */}
          <section id="language" className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <FaGlobe className="mr-2" />
              Language & Region
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="GMT">GMT</option>
                  <option value="GMT+5:30">GMT+5:30 (IST)</option>
                  <option value="GMT-5">GMT-5 (EST)</option>
                  <option value="GMT-8">GMT-8 (PST)</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
// import React, { useState } from 'react';
// import { FaUser, FaEnvelope, FaLock, FaBell, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useUserData } from '../Context/UserContext';

// const SettingsPage = () => {
//     const { user } = useUserData();
    
//     // State for form fields
//     const [formData, setFormData] = useState({
//         username: user.data.user.email.split('@')[0],
//         email: user.data.user.email,
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//     });
//     const [notifications, setNotifications] = useState({
//         emailNotifications: true,
//         pushNotifications: false
//     });
//     const [showPassword, setShowPassword] = useState({
//         current: false,
//         new: false,
//         confirm: false
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleNotificationChange = (e) => {
//         const { name, checked } = e.target;
//         setNotifications(prev => ({
//             ...prev,
//             [name]: checked
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Add your save settings logic here
//         console.log('Settings saved:', { formData, notifications });
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto">
//                 <div className="bg-white rounded-xl shadow-md p-6">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

//                     <form onSubmit={handleSubmit} className="space-y-8">
//                         {/* Account Settings */}
//                         <div>
//                             <h2 className="text-xl font-semibold text-gray-900 mb-4">Account</h2>
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Username
//                                     </label>
//                                     <div className="relative">
//                                         <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         <input
//                                             type="text"
//                                             name="username"
//                                             value={formData.username}
//                                             onChange={handleInputChange}
//                                             className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Email
//                                     </label>
//                                     <div className="relative">
//                                         <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             value={formData.email}
//                                             onChange={handleInputChange}
//                                             className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Password Settings */}
//                         <div>
//                             <h2 className="text-xl font-semibold text-gray-900 mb-4">Password</h2>
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Current Password
//                                     </label>
//                                     <div className="relative">
//                                         <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         <input
//                                             type={showPassword.current ? 'text' : 'password'}
//                                             name="currentPassword"
//                                             value={formData.currentPassword}
//                                             onChange={handleInputChange}
//                                             className="pl-10 pr-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
//                                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                                         >
//                                             {showPassword.current ? <FaEyeSlash /> : <FaEye />}
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         New Password
//                                     </label>
//                                     <div className="relative">
//                                         <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         <input
//                                             type={showPassword.new ? 'text' : 'password'}
//                                             name="newPassword"
//                                             value={formData.newPassword}
//                                             onChange={handleInputChange}
//                                             className="pl-10 pr-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
//                                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                                         >
//                                             {showPassword.new ? <FaEyeSlash /> : <FaEye />}
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Confirm New Password
//                                     </label>
//                                     <div className="relative">
//                                         <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         <input
//                                             type={showPassword.confirm ? 'text' : 'password'}
//                                             name="confirmPassword"
//                                             value={formData.confirmPassword}
//                                             onChange={handleInputChange}
//                                             className="pl-10 pr-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
//                                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                                         >
//                                             {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Notification Settings */}
//                         <div>
//                             <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
//                             <div className="space-y-4">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center">
//                                         <FaBell className="mr-2 text-gray-400" />
//                                         <span className="text-sm font-medium text-gray-700">Email Notifications</span>
//                                     </div>
//                                     <input
//                                         type="checkbox"
//                                         name="emailNotifications"
//                                         checked={notifications.emailNotifications}
//                                         onChange={handleNotificationChange}
//                                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                     />
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center">
//                                         <FaBell className="mr-2 text-gray-400" />
//                                         <span className="text-sm font-medium text-gray-700">Push Notifications</span>
//                                     </div>
//                                     <input
//                                         type="checkbox"
//                                         name="pushNotifications"
//                                         checked={notifications.pushNotifications}
//                                         onChange={handleNotificationChange}
//                                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Save Button */}
//                         <div className="flex justify-end space-x-4">
//                             <button
//                                 type="button"
//                                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
//                             >
//                                 Save Changes
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SettingsPage;