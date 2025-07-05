import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Main from './pages/MainPage';
import Game from './pages/GamePage';
import Result from './pages/ResultPage';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/game' element={<Game />} />
      <Route path='/result' element={<Result />} />
    </Routes>
  );
}

export default App;
