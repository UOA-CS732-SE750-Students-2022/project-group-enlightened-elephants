import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import PageLayout from './page/PageLayout';
import Contect from './page/Contect';
import Home from './page/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path='home' element={<Home />} />
          <Route path='contect' element={<Contect />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
