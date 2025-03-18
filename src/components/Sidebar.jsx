import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <nav className="sidebar-nav">
        <Link to="/" className="nav-link">
          Ana Sayfa
        </Link>
        <Link to="/profile" className="nav-link">
          Profilim
        </Link>
        <Link to="/about" className="nav-link">
          Hakkında
        </Link>
        <Link to="/AdminLogin" className="nav-link">
          Admin Girişi
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;