import React from 'react'
import { ChatData } from '../Context/ChatContext';

const Header = () => {
    const {chat} = ChatData();
  return (
    <div>
      {chat && chat.length === 0 && (<p className='text-lg mb-6'> Create new chat to continue </p>)}
    </div>
  )
}

export default Header
