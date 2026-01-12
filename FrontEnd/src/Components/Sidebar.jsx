import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { ChatData } from '../Context/ChatContext';
import { MdDelete, MdAdd, MdLogout } from "react-icons/md";
import { LoadingSpinnner } from './Loading';
import { useUserData } from '../Context/UserContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, setSelected, deleteChat, selected } = ChatData();
  const { handleLogout } = useUserData();

  const deleteChatHandler = (e, id) => {
    e.stopPropagation(); // Prevents selecting the chat when clicking delete
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id);
    }
  };

  function clickEvent(id) {
    setSelected(id);
    if (window.innerWidth < 768) toggleSidebar();
  }

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0f172a] text-slate-200 p-5 transition-transform duration-300 ease-in-out border-r border-slate-800
                    md:relative md:translate-x-0 md:flex md:flex-col
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

      {/* Mobile Close Button */}
      <button className='md:hidden absolute top-4 right-4 text-slate-400 hover:text-white transition' onClick={toggleSidebar}>
        <IoMdCloseCircle size={28} />
      </button>

      {/* Logo Section */}
      <div className='flex items-center gap-3 mb-8 px-2'>
        <div className='w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20'>
          <span className='text-white font-bold'>C</span>
        </div>
        <h1 className='text-xl font-bold tracking-tight text-white'>ChatBot AI</h1>
      </div>

      {/* New Chat Button */}
      <div className='mb-6'>
        <button 
          onClick={createChat} 
          disabled={createLod}
          className='flex items-center justify-center gap-2 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 font-medium active:scale-[0.98]'
        >
          {createLod ? <LoadingSpinnner /> : (
            <>
              <MdAdd size={20} />
              <span>New Chat</span>
            </>
          )}
        </button>
      </div>

      {/* Chat History List */}
      <div className='flex-1 flex flex-col min-h-0'>
        <p className='text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-3 px-2'>Recent Chats</p>
        
        <div className='flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar'>
          {chats && chats.length > 0 ? (
            chats.map((e) => (
              <div 
                key={e._id} 
                onClick={() => clickEvent(e._id)}
                className={`group flex items-center justify-between w-full p-3 rounded-xl cursor-pointer transition-all duration-200 border border-transparent
                  ${selected === e._id 
                    ? 'bg-slate-800 border-slate-700 text-white' 
                    : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'}`}
              >
                <span className='text-sm truncate mr-2 font-medium'>
                  {e.latestMessage ? e.latestMessage.slice(0, 28) + "..." : "Empty Chat"}
                </span>
                
                <button 
                  onClick={(event) => deleteChatHandler(event, e._id)}
                  className='opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all'
                >
                  <MdDelete size={18}/>
                </button>
              </div>
            ))
          ) : (
            <div className='text-center py-10 text-slate-600 text-sm italic'>
              No conversations yet
            </div>
          )}
        </div>
      </div>

      {/* Footer / User Section */}
      <div className='mt-auto pt-4 border-t border-slate-800'>
        <button 
          className='flex items-center gap-3 w-full p-3 text-slate-400 hover:text-white hover:bg-red-500/10 rounded-xl transition-colors text-sm font-medium'
          onClick={() => handleLogout()}
        >
          <MdLogout size={20} className="text-red-500" />
          Logout Account
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

// import React from 'react'
// import { IoMdCloseCircle } from "react-icons/io";
// import { ChatData } from '../Context/ChatContext';
// import { MdDelete } from "react-icons/md";
// import { LoadingSpinnner } from './Loading';
// import { useUserData } from '../Context/UserContext';

// const Sidebar = ({isOpen, toggleSidebar}) => {
//   const {chats, createChat, createLod, setSelected, deleteChat} = ChatData();
//   const {handleLogout} = useUserData()
  
//   const deleteChatHandler = (id) => {
//     if(confirm("Are you sure to delete this chat ?")){
//       deleteChat(id);
//     }
//   }

//   function clickEvent(id){
//     setSelected(id);
//     toggleSidebar();
//   }

//   return (
//     <div className={`fixed inset-0 bg-gray-800 p-4 transition-transform transform
//                     md:relative md:translate-x-0 md:w-1/4 md:block  
//                     ${isOpen ? "translate-x-0" : "-translate-x-full" }`}> 
//       <button className='md:hidden p-2 mb-4 bg-gray-700 rounded text-2xl' onClick={toggleSidebar}> 
//         <IoMdCloseCircle/> 
//       </button>

//       <div className='text-2xl font-semibold mb-6'>Chatbot</div>

//       <div className='mb-4'>
//         <button onClick={createChat} className='w-full py-2 bg-gray-700 hover:bg-gray-600 rounded'>
//           {createLod ? <LoadingSpinnner/> : "New Chat +"}
//         </button>
//       </div>

//       <div>
//         <p className='text-sm text-gray-400 mb-2'>Recent</p>

//         <div className='max-h-[500px] overflow-y-auto mb-20 md:mb-0 thinScrollBar'>
//           {
//             chats && chats.length > 0 ? (chats.map((e) => (
//               <div key={e._id} className='w-full text-left py-2 px-2 bg-gray-700 
//                     hover:bg-gray-600 rounded mt-2 flex justify-between items-center'>
                
//                 <button 
//                   onClick={() => clickEvent(e._id)}
//                   className='flex-1 text-left'
//                 >
//                   {e.latestMessage.slice(0,38)}...
//                 </button>
                
//                 <button 
//                   onClick={ () => deleteChatHandler(e._id)}
//                   className='bg-indigo-600 text-white text-xl px-3 py-2 rounded-md hover:bg-red-700'
//                 >
//                   <MdDelete/>
//                 </button>
//               </div>
//             ))) : (<p>No chats yet</p>)
//           }
//         </div>
//       </div>

//       <div className='absolute bottom-0 mb-6 w-full'>
//         <button 
//           className='bg-indigo-600 text-white text-xl px-3 py-2 rounded-md hover:bg-red-700'
//           onClick={() => handleLogout()}
//         >
          
//           Logout
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Sidebar
