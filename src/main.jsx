import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home.jsx'
import Category from './Category.jsx'
import MainLayout from './components/MainLayout'
import Checkout from './Checkout.jsx'
import Cart from './Cart.jsx'
import WebSiteContext from './context/WebSiteContext.jsx'


createRoot(document.getElementById('root')).render(

  <StrictMode>

    <WebSiteContext>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='/category' element={<Category />} />
            <Route path='/category/checkout/:id' element={<Checkout />} />
            <Route path='/cart' element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WebSiteContext>
    
  </StrictMode>,
)
