import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import PageLayout from './page/PageLayout';
import Contact from './page/Contact';
import Home from './page/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path='home' element={<Home />} />
          <Route path='contact' element={<Contact />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
