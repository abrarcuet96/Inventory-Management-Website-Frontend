import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import myRoutes from './Routes/Routes'
import AuthProvider from './providers/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
      <AuthProvider>
        <RouterProvider router={myRoutes} />
      </AuthProvider>
    
  </React.StrictMode>,
)
