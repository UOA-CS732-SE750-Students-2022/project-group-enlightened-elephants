import { Routes, Route, Navigate } from 'react-router-dom';
import PageLayout from './page/PageLayout';
import Contact from './page/Contact';
import Home from './page/Home'
import useLocalStorage from './hooks/useLocalStorage';


function App() {

  return (
    <Routes>
      <Route path='/' element={<PageLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path='home' element={<Home />} />
        <Route path='contact' element={<Contact />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
