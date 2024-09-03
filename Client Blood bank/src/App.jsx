
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import Activate from './views/Activate'
import { OverlayProvider } from './context/overlayContext'
import Spinner from './context/overlays/Spinner'
import "react-toastify/dist/ReactToastify.css";
import DashLayout from './components/DashLayout'
import Stockmoniter from './components/Stockmoniter'
import DonorManage from './components/DonorManage'
import DonationCamp from './components/DonationCamp'
import UserManage from './components/UserManage'
import Statistic from './components/Statistic'
import RequestBlood from './components/RequestBlood'
import IssueBlood from './components/IssueBlood'
import DonerRegister from './components/DonorRegister'
import DonerApprove from './components/DonorApprove'
import DonorProfile from './components/DonorProfile'
import AddUser from './components/AddUser'
import Users from './components/Users'
import Logout from './context/overlays/Logout'

function App() {

  return (
    <OverlayProvider>
      <Spinner/>
    <Routes>
      <Route path="/" Component = {Login}/>
      <Route path="/home" Component = {Home}/>
      <Route path='/register' Component = {Register}/>
      <Route path='/activate/:Email/:token' Component = {Activate}/>
      <Route path="*" element={<h1 className='flex justify-center items-center text-bloodred3 text-5xl h-screen'>{"404 Page Not Found :("}</h1>} />
      <Route path="/user/dash" element={<DashLayout />} >
        <Route index element={<Navigate to = 'stocks'/>}/>
        <Route path='stocks' element={<Stockmoniter/>}/>
        <Route path='donor' element={<DonorManage/>}>
          <Route index element={<Navigate to = 'register'/>}/>
          <Route path='register' element={<DonerRegister/>}/>
          <Route path='application' element={<DonerApprove/>}/>
          <Route path='profile' element={<DonorProfile/>}/>
        </Route>
        <Route path='donorcamps' element={<DonationCamp/>}/>
        <Route path='manageuser' element={<UserManage/>}>
          <Route index element={<Navigate to = 'adduser'/>}/>
          <Route path='adduser' element={<AddUser/>}/>
          <Route path='view' element={<Users/>}/>
        </Route>
        <Route path="stat" element={<Statistic/>}/>
        <Route path='request' element={<RequestBlood/>}/>
        <Route path='issueblood' element={<IssueBlood/>}/>
      </Route>
    </Routes>
    </OverlayProvider>
  )
}

export default App
