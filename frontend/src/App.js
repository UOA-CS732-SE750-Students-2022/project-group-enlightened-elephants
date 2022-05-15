import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import axios from 'axios'

import PageLayout from './page/PageLayout';
import Result from './page/Result';
import Home from './page/Home'
import useLocalStorage from './hooks/useLocalStorage';
import { AuthContext } from './context/authContext'


export default function App() {
  const { isLogin, setIsLogin, userName, setUserName, setUserId } = useContext(AuthContext)
  const [token, setToken] = useLocalStorage('token')

  // Auto Login
  useEffect(() => {
    async function autoLogin() {
      try {
        const { data } = await axios({
          method: 'get',
          url: '/user/tokenLogin',
          headers: {
            token: token
          }
        })
        if (data.success) {
          setIsLogin(true)
          setUserName(data.user.username)
        } else {
          setToken(null)
          setIsLogin(false)
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (!isLogin && token) {
      autoLogin()
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path='home' element={<Home />} />
          <Route path='result' element={<Result />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

