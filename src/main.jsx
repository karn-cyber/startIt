import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'  // ✅ Import this
import { router } from './Routes'                   // ✅ Use the router you defined
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />  {/* ✅ Use the router */}
  </StrictMode>,
)
