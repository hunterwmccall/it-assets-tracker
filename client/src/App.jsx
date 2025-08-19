import { useState, useEffect } from 'react';
import styles from './App.module.css';
function App () {
    const [serverStatus, setServerStatus] = useState('Checking...');
    const [assets, setAssets] = useState ([]);
    useEffect (() => {
        fetch('/api/health')
        .then(res => res.json())
        .then(data => {
            setServerStatus(data.ok ? 'Server OK' : 'Server Error');
        })
        .catch(() => {
            setServerStatus('Server Offline');
        });
        fetch('/api/assets')
        .then(res => res.json())
        .then(data => {
            setAssets(Array.isArray(data) ? data : []);
        }) 
        .catch(err => {
            console.error('Failed to fetch assets:', err);
        });
    }, []);
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>IT Assets Tracker </h1>
                <div className={styles.status}>
                    Status: <span
                    className={styles.statusText}>{serverStatus}</span>
                </div>
            </header>
            <main className={styles.main}>
                <section className={styles.section}>
                    <h2>Welcome</h2>
                    <p>This is your IT asset tracking system. The server is connected and ready.<p></p></p>
                </section>
<section className={styles.section}>
    <h2>Assets ({assets.length})</h2>
    {assets.length === 0 ? (
        <p className={styles.emptyState}>No assets found. Add some through the API!</p>
    ) : (
        <div className={styles.assetList}>
            {assets.map(asset => (
                <div key={(asset.id)} className={styles.assetCard}>
                    <h3>{asset.name}</h3>
                    <p><strong>Category:</strong> {asset.category}</p>
                    <p><strong>Serial:</strong> {asset.serialNumber}</p>
                    {asset.location && <p><strong>Location:</strong>
                {asset.location}</p>}
                </div>
                    ))}
                    </div>
                )}
                </section>
                </main>
                </div>
            );
        }
               
export default App;