import { useState } from 'react';
import styles from './AssetCard.module.css';
function AssetCard({ asset, onAssetUpdated, onAssetDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editData, setEditData] = useState({
        name: asset.name,
        category: asset.category,
        serialNumber: asset.serialNumber,
        location: asset.location || '',
        purchasedAt: asset.purchasedAt ? asset.purchasedAt.split('T')[0] : '',
        notes: asset.notes || ''
    });
    const [error, setError] = useState('');
    const formatDate = (dateString) => {
        if(!dateString) return 'Not specified';
        return new Date(dateString).toLocaleDateString();
    };
    const handleEditChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });
    };
const handleSave = async (e) => {
    e.preventDefault();
    setError('');
try {
    const response = await fetch(`/api/assets/${asset.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(editData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update asset');
        }
        const updatedAsset = await response.json();
        onAssetUpdated(updatedAsset);
        setIsEditing(false);
    } catch (err) {
        setError(err.message);
    }
};
const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this asset?')) {
        return;
    }
    setIsDeleting(true);
    try {
        const response = await fetch(`/api/assets/${asset.id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete asset');
        }
        onAssetDeleted(asset.id);
    } catch (err) {
        setError(err.message);
        setIsDeleting(false);
    }
};
if (isEditing) {
    return (
        <div className={styles.assetCard}>
            <form onSubmit={handleSave} className={styles.editForm}>
                {error && <div className={styles.error}>{error}</div>}
                <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                required
                className={styles.editInput}
                />
                <select
                name="category"
                value={editData.category}
                onChange={handleEditChange}
                required
                className={styles.editInput}
                >
                    <option value="Computer">Computer</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Printer">Printer</option>
                    <option value="Phone">Phone</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Server">Server</option>
                    <option value="Other">Other</option>
                </select>
                <input
                type="text"
                name="serialNumber"
                value={editData.serialNumber}
                onChange={handleEditChange}
                required
                className={styles.editInput}
                />
                <input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleEditChange}
                placeholder="Location"
                className={styles.editInput}
                />
                <input
                type="date"
                name="purchasedAt"
                value={editData.purchasedAt}
                onChange={handleEditChange}
                className={styles.editInput}
                />
                <textarea
                name="notes"
                value={editData.notes}
                onChange={handleEditChange}
                placeholder="Notes"
                rows="2"
                className={styles.editInput}
                />
                <div className={styles.editActions}>
                    <button type="submit" className={styles.saveBtn}>Save</button>
                    <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className={styles.cancelBtn}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
return (
<div className={styles.assetCard}>
    {error && <div className={styles.error}>{error}</div>}
<div className={styles.cardHeader}>
    <h3>{asset.name}</h3>
    <div className={styles.actions}>
        <button
        onClick={() => setIsEditing(true)}
        className={styles.editBtn}
        title="Edit asset"
        >
            </button>
            <button
            onClick={handleDelete}
                disabled={isDeleting}
                  className={styles.deleteBtn}
                title="Delete asset"
                >
                {isDeleting ? '⏳' : '🗑️'}
        </button>
    </div>
</div>
<div className={styles.cardContent}>
    <p><strong>Category:</strong> {asset.category}</p>
    <p><strong>Serial:</strong> {asset.serialNumber}</p>
    {asset.location && <p><strong>Location:</strong> {asset.location}</p>}
    <p><strong>Purchased:</strong> {formatDate(asset.purchasedAt)}</p>
    {asset.notes && <p><strong>Notes: </strong> {asset.notes}</p>}
    <p className={styles.timestamp}>
        <strong>Added:</strong> {formatDate(asset.createdAt)}
    </p>
</div>
</div>
);
}
export default AssetCard;