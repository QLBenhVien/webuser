import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrangChu from './Pages/TrangChu/TrangChu';
import DatLichKham from './Pages/DatKham/DatLichKham';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrangChu />} />
        <Route path="/datlich" element={<DatLichKham />} />
      </Routes>
    </Router>
  );
}

export default App;
