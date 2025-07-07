import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authslice'


function LogOutBtn() {

    const dispatch = useDispatch()
    
    const logouthandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }

  return (
    <div  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
      <button onClick={logouthandler}>LogOut</button>
    </div>
  )
}

export default LogOutBtn

// where ever we use like Login and Login what we are actually that store ke andar cheeze updated rahe 
//   authService.logout() this will always return a promise so we have to handle it using then catch 
