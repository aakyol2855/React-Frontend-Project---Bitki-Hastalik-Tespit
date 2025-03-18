import { useState } from 'react';
import './Profile.css';

function Profile({ isLoggedIn }) {
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  
  // Varsayılan kullanıcı verisi
  const defaultUserInfo = {
    name: "Guest",
    email: "---",
    phone: "---"
  };

  // Giriş yapılmışsa gerçek veri, yapılmamışsa varsayılan veri
  const [userInfo, setUserInfo] = useState(
    isLoggedIn ? {
      name: "John Doe",
      email: "john@example.com",
      phone: "+90 555 123 4567"
    } : defaultUserInfo
  );

  // Test geçmişi sadece giriş yapılmışsa gösterilecek
  const [testHistory] = useState(
    isLoggedIn ? [
      {
        id: 1,
        date: "2024-01-15",
        type: "Toprak Analizi",
        result: "pH Seviyesi: 6.5 - Normal",
        recommendation: "Mevcut durumu koruyun"
      },
      {
        id: 2,
        date: "2024-01-20",
        type: "Yaprak Analizi",
        result: "Mantar Enfeksiyonu Tespit Edildi",
        recommendation: "Fungisit uygulaması önerilir"
      }
    ] : []
  );

  const handleInfoUpdate = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Bilgileri güncellemek için lütfen giriş yapın.");
      return;
    }
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {isLoggedIn ? (
            <img src="/user-avatar.png" alt="Profil" />
          ) : (
            <div className="guest-avatar">G</div>
          )}
        </div>
        {!isLoggedIn && (
          <div className="guest-banner">
            <p>Tüm özelliklere erişmek için lütfen giriş yapın</p>
          </div>
        )}
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          Kullanıcı Bilgileri
        </button>
        <button 
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
          disabled={!isLoggedIn}
        >
          Test Geçmişi
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'info' ? (
          <div className="user-info">
            <h2>Kullanıcı Bilgileri</h2>
            {isEditing && isLoggedIn ? (
              <form onSubmit={handleInfoUpdate} className="edit-form">
                <div className="form-group">
                  <label>İsim</label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label>Telefon</label>
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                    className="input"
                  />
                </div>
                <div className="button-group">
                  <button type="submit" className="button button-primary">
                    Kaydet
                  </button>
                  <button 
                    type="button" 
                    className="button button-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    İptal
                  </button>
                </div>
              </form>
            ) : (
              <div className="info-display">
                <div className="info-row">
                  <span className="info-label">İsim:</span>
                  <span className="info-value">{userInfo.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{userInfo.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Telefon:</span>
                  <span className="info-value">{userInfo.phone}</span>
                </div>
                {isLoggedIn && (
                  <button 
                    className="button button-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Bilgileri Düzenle
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="test-history">
            <h2>Test Geçmişi</h2>
            {isLoggedIn ? (
              <div className="history-list">
                {testHistory.map(test => (
                  <div key={test.id} className="history-item">
                    <div className="history-header">
                      <span className="history-date">{test.date}</span>
                      <span className="history-type">{test.type}</span>
                    </div>
                    <div className="history-details">
                      <p><strong>Sonuç:</strong> {test.result}</p>
                      <p><strong>Öneri:</strong> {test.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-history">
                <p>Test geçmişini görüntülemek için giriş yapmalısınız.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile; 