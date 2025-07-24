import React from 'react'
import Home from './component/pages/home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContactPage from './component/ui/contact/ContactPage';
import Navbar from './component/pages/navbar/Navbar';
import Footer from './component/ui/footer/Footer';

function App() {
  return (
     <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;