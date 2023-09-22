import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import Login from './Login';
import Main from './Main';
import Files from './Files';
import Favorites from './Favorites';  // Importe este componente

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/files" element={<Files />} />
              <Route path="/favorites" element={<Favorites />} />  {/* Adicione esta rota */}
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
