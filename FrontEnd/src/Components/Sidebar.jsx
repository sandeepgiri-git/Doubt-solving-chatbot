import React from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { ChatData } from '../Context/ChatContext';
import { MdDelete } from "react-icons/md";
import { LoadingSpinnner } from './Loading';
import { useUserData } from '../Context/UserContext';

const Sidebar = ({isOpen, toggleSidebar}) => {
  const {chats, createChat, createLod, setSelected, deleteChat} = ChatData();
  const {handleLogout} = useUserData()
  
  const deleteChatHandler = (id) => {
    if(confirm("Are you sure to delete this chat ?")){
      deleteChat(id);
    }
  }

  function clickEvent(id){
    setSelected(id);
    toggleSidebar();
  }

  return (
    <div className={`fixed inset-0 bg-gray-800 p-4 transition-transform transform
                    md:relative md:translate-x-0 md:w-1/4 md:block  
                    ${isOpen ? "translate-x-0" : "-translate-x-full" }`}> 
      <button className='md:hidden p-2 mb-4 bg-gray-700 rounded text-2xl' onClick={toggleSidebar}> 
        <IoMdCloseCircle/> 
      </button>

      <div className='text-2xl font-semibold mb-6'>Chatbot</div>

      <div className='mb-4'>
        <button onClick={createChat} className='w-full py-2 bg-gray-700 hover:bg-gray-600 rounded'>
          {createLod ? <LoadingSpinnner/> : "New Chat +"}
        </button>
      </div>

      <div>
        <p className='text-sm text-gray-400 mb-2'>Recent</p>

        <div className='max-h-[500px] overflow-y-auto mb-20 md:mb-0 thinScrollBar'>
          {
            chats && chats.length > 0 ? (chats.map((e) => (
              <div key={e._id} className='w-full text-left py-2 px-2 bg-gray-700 
                    hover:bg-gray-600 rounded mt-2 flex justify-between items-center'>
                
                <button 
                  onClick={() => clickEvent(e._id)}
                  className='flex-1 text-left'
                >
                  {e.latestMessage.slice(0,38)}...
                </button>
                
                <button 
                  onClick={ () => deleteChatHandler(e._id)}
                  className='bg-indigo-600 text-white text-xl px-3 py-2 rounded-md hover:bg-red-700'
                >
                  <MdDelete/>
                </button>
              </div>
            ))) : (<p>No chats yet</p>)
          }
        </div>
      </div>

      <div className='absolute bottom-0 mb-6 w-full'>
        <button 
          className='bg-indigo-600 text-white text-xl px-3 py-2 rounded-md hover:bg-red-700'
          onClick={() => handleLogout()}
        >
          
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar

// import React from 'react'
// import { IoMdCloseCircle } from "react-icons/io";
// import { ChatData } from '../Context/ChatContext';
// import { MdDelete } from "react-icons/md";
// import { LoadingSpinnner } from './Loading';

// const Sidebar = ({isOpen, toggleSidebar}) => {
//   const {chats,createChat, createLod, setSelected} = ChatData();
//   return (
//     <div className={`fixed inset-0 bg-gray-800 p-4 transition-transform transform
//                     md:relative md:translate-x-0 md:w-1/4 md:block  
//                     ${isOpen ? "translate-x-0" : "-translate-x-full" }`}> 
//       <button className='md:hidden p-2 mb-4 bg-gray-700 rounded text-2xl' onClick={toggleSidebar}> <IoMdCloseCircle/> </button>

//       <div className='text-2xl font-semibold mb-6'>Chatbot</div>

//       <div className='mb-4'>
//         <button onClick={createChat} className='w-full py-2 bg-gray-700 hover:bg-gray-600 rounds'>
//           {createLod ? <LoadingSpinnner/> : "New Chat +"}
//         </button>
//       </div>

//       <div>
//         <p className='text-sm text-grat-400 mb-2'>Recent</p>

//         <div className='max-h-[500px] overflow-y-auto mb-20 md:mb-0 thinScrollBar'>
//           {
//             chats && chats.length > 0 ? (chats.map((e) => (
//               <button key = {e._id} 
//                 onClick={() => setSelected(e._id)}
//                 className='w-full text-left py-2 px-2 bg-gray-700 
//                         hover:bg-gray-600 rounded mt-2 flex justify-between items-center'>

//                 <span>{e.latestMessage.slice(0,38)}...</span>
//                 <button className='bg-red-600 text-white text-xl px-3 py-2 rounded-md
//                                 hover:bg-red-700' >
//                         <MdDelete/>
//                 </button>
//           </button>
//             ))) : (<p>No chats yet</p>)
//           }
//         </div>

//       </div>

//       <div className='absolute bottom-0 mb-6 w-full'>
//         <button className='bg-red-600 text-white text-xl px-3 py-2 rounded-md
//         hover:bg-red-700'>Logout</button>
//       </div>
      
//     </div>
//   )
// }

// export default Sidebar
