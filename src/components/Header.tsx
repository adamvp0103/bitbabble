import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '../icons/MenuIcon';
import { useState } from 'react';
import XIcon from '../icons/XIcon';

function Header() {
  const navigate = useNavigate();

  const [showNav, setShowNav] = useState(false);

  return (
    <header className="header">
      <h1 className="wordmark" onClick={() => navigate('/')}>
        BitBabble
      </h1>
      <button className="nav-button" onClick={() => setShowNav(!showNav)}>
        {showNav ? <XIcon /> : <MenuIcon />}
      </button>
      <nav className={`nav ${showNav ? '' : 'hidden-nav'}`}>
        <div className="nav-links">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="nav-link">Home</span>
          </Link>
          <Link to="/search" style={{ textDecoration: 'none' }}>
            <span className="nav-link">Search</span>
          </Link>
          <Link to="/account" style={{ textDecoration: 'none' }}>
            <span className="nav-link">Account</span>
          </Link>
        </div>
        <Link to="/new-post" style={{ textDecoration: 'none' }}>
          <button className="button">New Post</button>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
