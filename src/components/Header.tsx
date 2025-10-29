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
          <Link to="/">
            <span className="nav-link">Home</span>
          </Link>
          <Link to="/search">
            <span className="nav-link">Search</span>
          </Link>
          <Link to="/account">
            <span className="nav-link">Account</span>
          </Link>
        </div>
        <Link to="/new-post">
          <button className="button">New Post</button>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
