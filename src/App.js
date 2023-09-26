import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Main from './Main';
import Files from './Files';
import Favorites from './Favorites';
import Login from './Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Main favorites={favorites} setFavorites={setFavorites} />} />
              <Route path="/files" element={<Files favorites={favorites} setFavorites={setFavorites} />} />
              <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
              {/* Adicione outras rotas aqui, se necessário */}
            </Routes>
          </>
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </Router>
  );
}

export default App;
