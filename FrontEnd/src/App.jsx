import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Verify from './Pages/Verify'
import { useUserData } from './Context/UserContext'
import { LoadingScreen } from './Components/Loading'
import Dashboard from './Pages/DashBoard'

function App() {

  const {isAuth, isLoad} = useUserData(); 
  // console.log("is load is ",isLoad);

  //isAuth ? <Home/> : <Login/> 
  // agar auth hai to home page matlab chatbot dikhega nhi to login page dikhega 
  return (
    <>
      {isLoad ? (<LoadingScreen/>) : (<BrowserRouter>
        <Routes> 
          <Route path='/' element = {isAuth ? <Home/> : <Dashboard/>}/> 
          <Route path='/home' element = {isAuth ? <Home/> : <Login/>}/> 
          <Route path='/login' element = {isAuth ? <Home/> : <Login/>}/>
          <Route path='/verify' element = {isAuth ? <Home/> : <Verify/>}/>
        </Routes>
      </BrowserRouter>)}
      
    </>
  )
}

export default App
