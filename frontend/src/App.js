import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import GetAll from "./GetALl";
import GetByEntry from "./GetByEntry";

export default function App() {
  return (
    <Routes>
      <Route path="getAll" element={<GetAll />} />
      <Route path="getByEntry" element={<GetByEntry />} />
    
  
    </Routes>
  );
}

