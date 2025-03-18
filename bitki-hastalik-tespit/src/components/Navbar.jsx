import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ toggleSidebar, openLoginModal, isLoggedIn }) {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      openLoginModal();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="menu-button" onClick={toggleSidebar}>
            ☰
          </button>
          <h1 className="navbar-title">Dr.PlantAI</h1>
        </div>

        <button className="login-button" onClick={handleAuthClick}>
          {isLoggedIn ? 'Hesabım' : 'Giriş Yap'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 