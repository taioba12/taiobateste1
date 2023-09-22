import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="Sidebar">
      <ul>
        <li><Link to="/">Início</Link></li>
        <li><Link to="/files">Files</Link></li>
        <li><Link to="#">Favoritos</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
