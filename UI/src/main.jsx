import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'

import {InfoContext} from './Pages/CatsContext.jsx'
import {Slide_context} from './Sliding.jsx'
import {User_login} from './Pages/AuthenticateContext.jsx'


import App from './App.jsx'
import Info from './Pages/Info.jsx'
import SignIn from './Pages/Sign_in.jsx' 
import  LogIn from './Pages/LogIn.jsx'
import Profile from './Pages/Profile.jsx'
import Posts from './Pages/Posts.jsx' 

const router = createBrowserRouter([
  {path : '/',
  element : <App/>,
  },
  {
    path : '/Info',
    element: <Info/>
  },
  {
    path: '/Sign_Up',
    element: <SignIn/>
  },
  {
    path:'/Log_In',
    element: <LogIn/>
  },
  {
    path:'/Profile' ,
    element: <Profile/>
  },
  {
    path:'/Posts',
    element : <Posts/>
  }
  ]
)




createRoot(document.getElementById('root')).render( 
  <StrictMode>

    
    <InfoContext>
    <Slide_context>
    <User_login>
    <RouterProvider router ={router} basename = '/Home' />
    </User_login>
    </Slide_context>
    </InfoContext>
    

  </StrictMode>,
)
