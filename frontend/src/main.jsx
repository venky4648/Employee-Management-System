/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContext from './context/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContext>
    <App />
  </AuthContext>,
)
