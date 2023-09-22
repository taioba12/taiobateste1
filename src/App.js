import React, { useState } from 'react';
import Login from './Login';
import Main from './Main';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn ? <Main /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}

export default App;
