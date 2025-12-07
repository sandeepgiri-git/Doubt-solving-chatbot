import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './Context/UserContext.jsx'
import { ChatProvider } from './Context/ChatContext.jsx'

export const server = "http://localhost:4000";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <UserProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </UserProvider>
    
  // </StrictMode>,
)
