import React, { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from "./store/authslice"
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'


function App() {

  const[loading,setLoading]=useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
          console.log("You are required to login")
        }
      } catch (error) {
        console.log("You are required to login",error)
      } finally {
        setLoading(false)
      }
    }
  
    fetchUser()
  },[])

  return  !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
           TODO 
        </main>
        <Footer/>
      </div>
    </div>
  ):(<p>This is showing null statement</p>)
}

export default App

//  How to improve product while on Loading state 
