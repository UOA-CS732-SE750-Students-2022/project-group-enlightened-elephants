import { createContext, useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import PageLayout from './page/PageLayout';
import Contact from './page/Contact';
import Home from './page/Home'

const [isLogin, setIsLogin] = useState(false)
const [userName, setUserName] = useState(null)
const [userId, setUserId] = useState(null)

const AuthContext = createContext()

function App() {
  return (
    <AuthContext.Provider value={isLogin, setIsLogin, userName, setUserName, userId, setUserId}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PageLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path='home' element={<Home />} />
            <Route path='contact' element={<Contact />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
