import { Link } from 'react-router-dom';
import MenuIcon from '../icons/MenuIcon';

function Header() {
  return (
    <header>
      <span>BitBabble</span>
      <MenuIcon />
      <nav>
        <div>
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/account">Account</Link>
        </div>
        <Link to="/new-post">New Post</Link>
      </nav>
    </header>
  );
}

export default Header;
