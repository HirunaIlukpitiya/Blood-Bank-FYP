
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './views/Home'
import Register from './views/Register'
import Login from './views/Login'
import DashBoardLayout from './components/DashBoardLayout'
import DashHome from './components/DashHome'
import History from './components/History'
import DonerFind from './components/DonerFind'
import Request from './components/Request'
import Profile from './components/Profile'
import Settings from './components/Settings'
import MakeRequest from './components/MakeRequest'
import Responses from './components/Responses'
import DonateBlood from './components/DonateBlood'
import DonationCamps from './components/DonationCamps'
import { OverlayProvider } from './context/overlayContext'
import Delete from './context/overlays/Delete'
import Logout from './context/overlays/Logout'
import Spinner from './context/overlays/Spinner'
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <OverlayProvider>
    <Spinner/>
    <Routes>
      <Route path="/" element = {<Home />}/>
      <Route path="/activate/:Email/:token" element = {<Register/>}/>
      <Route path='/user/login' element = {<Login/>}/>
      <Route path='/user/dash' element = {<DashBoardLayout/>}>
        <Route index element = {<Navigate to="home"/>}/>
        <Route path='home' element = {<DashHome/>}/>
        <Route path='history' element = {<History/>}/>
        <Route path='donerfind' element = {<DonerFind/>}>
          <Route index element = {<Navigate to="makeReq"/>}/>
          <Route path='makeReq' element = {<MakeRequest/>}/>
          <Route path='responses' element = {<Responses/>}/>
        </Route>
        <Route path='req' element = {<Request/>}/>
        <Route path='profile' element = {<Profile/>}/>
        <Route path='settings' element = {<Settings/>}/>
        <Route path='applyDonate' element = {<DonateBlood/>}/>
        <Route path='camps' element = {<DonationCamps/>}/>
      </Route>
    </Routes>
    </OverlayProvider>
  )
}

export default App
