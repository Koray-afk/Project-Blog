import React from 'react'
import {LogOutBtn,Logo,Container} from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {

  const authStatus = useSelector((state)=>state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex justify-around' >
            <div  className='mr-4'>
              <Link to='/'>
                <Logo width='70px'/>
              </Link>
            </div>
            <ul className='flex justify-evenly gap-2'>
            {navItems.map((item,index)=>
              item.active ? (
                <li key={index}>
                  <button onClick={()=>navigate(item.slug)} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' >
                    {item.name}
                  </button>
                </li>
              ):(null)
            )}
            {authStatus && (<li><LogOutBtn/></li>)  }
            </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header

// {authStatus && <LogOutBtn />} this means agar banda authenticated hai then only show him the Logout button 
