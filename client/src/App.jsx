import { useState, useEffect } from 'react';
import AssetForm from './components/AssetForm';
import AssetCard from './components/AssetCard';
import styles from './App.module.css';

function App() {
  const [serverStatus, setServerStatus] = useState('Checking...');
  const [assets, setAssets] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchAssets = async () => {
    try {
      const response = await fetch('/api/assets');
      const data = await response.json();
      setAssets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch assets:', err);
    }
  };

  useEffect(() => {
    // Check server health
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setServerStatus(data.ok ? 'Server all good in the hood fam!' : 'Server Error');
      })
      .catch(() => {
        setServerStatus('Server Offline');
      });

    // Fetch assets
    fetchAssets();
  }, []);

  const handleAssetCreated = (newAsset) => {
    setAssets([newAsset, ...assets]);
    setShowForm(false);
  };

  const handleAssetUpdated = (updatedAsset) => {
    setAssets(assets.map(asset => 
      asset.id === updatedAsset.id ? updatedAsset : asset
    ));
  };

  const handleAssetDeleted = (deletedId) => {
    setAssets(assets.filter(asset => asset.id !== deletedId));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>IT Assets Tracker</h1>
        <div className={styles.status}>
          Status: <span className={styles.statusText}>{serverStatus}</span>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Assets ({assets.length})</h2>
            <button 
              onClick={() => setShowForm(!showForm)}
              className={styles.toggleBtn}
            >
              {showForm ? 'Cancel' : 'Add Asset'}
            </button>
          </div>
          
          {showForm && (
            <AssetForm onAssetCreated={handleAssetCreated} />
          )}
          
          {assets.length === 0 ? (
            <p className={styles.emptyState}>
              No assets found. {!showForm && 'Click "Add Asset" to create your first one!'}
            </p>
          ) : (
            <div className={styles.assetList}>
              {assets.map(asset => (
                <AssetCard 
                  key={asset.id} 
                  asset={asset}
                  onAssetUpdated={handleAssetUpdated}
                  onAssetDeleted={handleAssetDeleted}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;