import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import GetAll from "./GetALl";
import GetByEntry from "./GetByEntry";
import Add from "./Add";
import Update from "./Update";
import Like from "./Like";
import Delete from "./Delete";


export default function App() {
  return (
    <Routes>
      <Route path="getAll" element={<GetAll />} />
      <Route path="getByEntry" element={<GetByEntry />} />
      <Route path="add" element={<Add />} />
      <Route path="update" element={<Update />} />
      <Route path="like" element={<Like />} />
      <Route path="delete" element={<Delete />} />
    
  
    </Routes>
  );
}

