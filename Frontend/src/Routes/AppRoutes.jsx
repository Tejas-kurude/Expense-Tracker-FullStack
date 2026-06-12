import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Transactions from '../pages/Transactions'
import Profile from '../pages/Profile'
import SignUp from '../components/SignUp'
import Login from '../components/Login'
import PostLog from '../pages/PostLog'
import Protectedroutes from './Protectedroutes'


const AppRoutes = () => {
  return (

    <Routes>

      <Route path="/" element={
        <Protectedroutes>
        <Home />
      </Protectedroutes>
      } />

      <Route path="/home" element={
        <Protectedroutes>
          <PostLog />
        </Protectedroutes>
      } />

      <Route path="/transaction" element={
        <Protectedroutes>
          <Transactions />
        </Protectedroutes>
      } />

      <Route path="/dashboard" element={
        <Protectedroutes>
          <Dashboard />
        </Protectedroutes>
      } />

      <Route path="/profile" element={
        <Protectedroutes>
          <Profile />
        </Protectedroutes>
      } />
      
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<SignUp />} />


    </Routes>

  )
}

export default AppRoutes 
