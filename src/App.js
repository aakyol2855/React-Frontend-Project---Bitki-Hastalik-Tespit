import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import LoginModal from './components/LoginModal';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import './styles/App.css';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trialCount, setTrialCount] = useState(0);
  const [showTrialError, setShowTrialError] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(
    localStorage.getItem('backgroundImage') || '/background.jpg'
  );

  useEffect(() => {
    // Arkaplan değişikliğini dinle
    const handleBackgroundChange = () => {
      setBackgroundImage(localStorage.getItem('backgroundImage'));
    };

    window.addEventListener('backgroundChanged', handleBackgroundChange);

    return () => {
      window.removeEventListener('backgroundChanged', handleBackgroundChange);
    };
  }, []);

  const handleAnalysis = () => {
    if (!isLoggedIn && trialCount >= 2) {
      setShowTrialError(true);
      setTimeout(() => {
        setShowTrialError(false);
        setLoginModalOpen(true);
      }, 3000);
      return false;
    }
    if (!isLoggedIn) {
      setTrialCount(prev => prev + 1);
    }
    return true;
  };

  return (
    <Router>
      <div 
        className="app" 
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <Sidebar isOpen={isSidebarOpen} />
        
        <div className="main-content">
          <Navbar 
            toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
            openLoginModal={() => setLoginModalOpen(true)}
            isLoggedIn={isLoggedIn}
          />
          
          <div className="container">
            <Routes>
              <Route path="/" element={<Home onAnalysis={handleAnalysis} trialCount={trialCount} isLoggedIn={isLoggedIn} showTrialError={showTrialError} />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} />} />
              <Route path="/AdminLogin" element={<AdminLogin />} />
              <Route path="/admin/panel" element={<AdminPanel />} />
            </Routes>
          </div>
        </div>

        {isLoginModalOpen && (
          <LoginModal 
            onClose={() => setLoginModalOpen(false)}
            onLogin={() => {
              setIsLoggedIn(true);
              setLoginModalOpen(false);
            }}
          />
        )}
      </div>
    </Router>
  );
}

export default App; 