
import React , { useState, useEffect } from 'react';
// import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import { AuthProvider } from './utils/AuthContext';


function App(props) {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  )
}
export default App;
