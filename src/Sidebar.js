import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import StarIcon from '@mui/icons-material/Star';
import './Sidebar.css';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={`Sidebar ${isCollapsed ? 'collapsed' : ''}`} 
      onMouseEnter={() => setIsCollapsed(false)} 
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <ul style={{ marginTop: '200px' }}>
        <li>
          <Link to="/">
            <HomeIcon />
            {!isCollapsed && ' Início'}
          </Link>
        </li>
        <li>
          <Link to="/files">
            <FolderIcon />
            {!isCollapsed && ' Files'}
          </Link>
        </li>
        <li>
          <Link to="/favorites">
            <StarIcon />
            {!isCollapsed && ' Favoritos'}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;