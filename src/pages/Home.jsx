import { useState, useEffect } from 'react';
import './Home.css';

function Home({ onAnalysis, trialCount, isLoggedIn }) {
  const [activeSections, setActiveSections] = useState({
    soil: false,
    image: false
  });
  const [formData, setFormData] = useState({
    ph: '',
    moisture: '',
    fertilizer: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [footerContent, setFooterContent] = useState(
    localStorage.getItem('homeFooterContent') || 'Bitkilerinizin sağlığı bizim önceliğimizdir.'
  );
  const [trialCounts, setTrialCounts] = useState({
    soil: parseInt(localStorage.getItem('soilTrialCount') || '0'),
    image: parseInt(localStorage.getItem('imageTrialCount') || '0')
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [trialError, setTrialError] = useState('');

  const MAX_TRIALS = 2;

  useEffect(() => {
    const handleContentChange = () => {
      setFooterContent(localStorage.getItem('homeFooterContent'));
    };

    window.addEventListener('contentChanged', handleContentChange);
    return () => window.removeEventListener('contentChanged', handleContentChange);
  }, []);

  const handleSoilAnalysis = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      const currentTrials = trialCounts.soil;
      if (currentTrials >= MAX_TRIALS) {
        setTrialError(`Deneme haklarınızı bitirdiniz. Lütfen daha fazlası için giriş yapınız.`);
        setShowLoginModal(true);
        setTimeout(() => {
          setTrialError('');
        }, 3000);
        return;
      }

      const newTrialCounts = {
        ...trialCounts,
        soil: currentTrials + 1
      };
      setTrialCounts(newTrialCounts);
      localStorage.setItem('soilTrialCount', newTrialCounts.soil);
    }
    
    setResult("Toprak Analiz Sonucu: Örnek sonuç");
  };

  const handleImageAnalysis = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      const currentTrials = trialCounts.image;
      if (currentTrials >= MAX_TRIALS) {
        setTrialError(`Deneme haklarınızı bitirdiniz. Lütfen daha fazlası için giriş yapınız.`);
        setShowLoginModal(true);
        setTimeout(() => {
          setTrialError('');
        }, 3000);
        return;
      }

      const newTrialCounts = {
        ...trialCounts,
        image: currentTrials + 1
      };
      setTrialCounts(newTrialCounts);
      localStorage.setItem('imageTrialCount', newTrialCounts.image);
    }
    
    setResult("Görüntü Analiz Sonucu: Örnek sonuç");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const toggleSection = (section) => {
    setActiveSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="home">
      {trialError && (
        <div className="trial-error">
          {trialError}
        </div>
      )}

      <div className="analysis-buttons">
        <button 
          className="analysis-choice-button"
          onClick={() => toggleSection('soil')}
        >
          <h3>Toprak Hastalık Analizi</h3>
          <p>pH, nem ve gübre değerlerini girerek analiz yapın</p>
          {!isLoggedIn && (
            <small className="trials-left">
              Kalan deneme: {MAX_TRIALS - trialCounts.soil}
            </small>
          )}
        </button>
        <button 
          className="analysis-choice-button"
          onClick={() => toggleSection('image')}
        >
          <h3>Görüntü ile Hastalık Tespiti</h3>
          <p>Bitki fotoğrafı yükleyerek hastalık analizi yapın</p>
          {!isLoggedIn && (
            <small className="trials-left">
              Kalan deneme: {MAX_TRIALS - trialCounts.image}
            </small>
          )}
        </button>
      </div>

      {activeSections.soil && (
        <div className="analysis-panel soil-panel">
          <div className="analysis-content">
            <button 
              className="close-button"
              onClick={() => toggleSection('soil')}
            >
              ×
            </button>
            <div className="analysis-form">
              <h2>Toprak Hastalık Analizi</h2>
              <form onSubmit={handleSoilAnalysis}>
                <div className="form-group">
                  <label>pH Değeri:</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.ph}
                    onChange={(e) => setFormData({...formData, ph: e.target.value})}
                    placeholder="6.0-8.0 arası bir değer girin"
                  />
                </div>

                <div className="form-group">
                  <label>Nem Oranı (%):</label>
                  <input
                    type="number"
                    value={formData.moisture}
                    onChange={(e) => setFormData({...formData, moisture: e.target.value})}
                    placeholder="0-100 arası bir değer girin"
                  />
                </div>

                <div className="form-group">
                  <label>Gübre Miktarı (kg/m²):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.fertilizer}
                    onChange={(e) => setFormData({...formData, fertilizer: e.target.value})}
                    placeholder="Gübre miktarını girin"
                  />
                </div>

                <div className="button-group">
                  <button type="submit" className="analyze-button">
                    Analiz Et
                  </button>
                </div>
              </form>
            </div>
            {result && activeSections.soil && (
              <div className="result-container">
                <h3>Analiz Sonucu</h3>
                <p>{result}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeSections.image && (
        <div className="analysis-panel image-panel">
          <div className="analysis-content">
            <button 
              className="close-button"
              onClick={() => toggleSection('image')}
            >
              ×
            </button>
            <div className="analysis-form">
              <h2>Görüntü ile Hastalık Tespiti</h2>
              <form onSubmit={handleImageAnalysis}>
                <div className="form-group">
                  <label>Bitki Fotoğrafı:</label>
                  <div className="image-upload-container">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="image-input"
                    />
                    {selectedImage && (
                      <div className="image-preview">
                        <img src={selectedImage} alt="Seçilen bitki" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="button-group">
                  <button type="submit" className="analyze-button">
                    Analiz Et
                  </button>
                </div>
              </form>
            </div>
            {result && activeSections.image && (
              <div className="result-container">
                <h3>Analiz Sonucu</h3>
                <p>{result}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="login-modal">
          {/* Login modal içeriği */}
        </div>
      )}
      
      <footer className="home-footer">
        <div className="footer-content">
          <p>{footerContent}</p>
          <p className="copyright">© {new Date().getFullYear()} Dr.PlantAI</p>
        </div>
      </footer>
    </div>
  );
}

export default Home; 