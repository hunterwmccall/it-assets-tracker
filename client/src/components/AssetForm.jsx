import { useState } from 'react';
import styles from './AssetForm.module.css';
function AssetForm({ onAssetCreated }) {
    const [formData, setFormData] = useState ({
        name: '',
        category: '',
        serialNumber: '',
        location: '',
        purchasedAt: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
        const response = await fetch('/api/assets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create asset');
        }
        const newAsset = await response.json();
        onAssetCreated(newAsset);
        setFormData({
            name: '',
            category: '',
            serialNumber: '',
            location: '',
            purchasedAt: '',
            notes: ''
        });
    } catch (err) {
        setError(err.message);
    } finally {
        setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <h3>Add New Asset</h3>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.row}>
            <div className={styles.field}>
                <label htmlFor="name">Asset Name *</label>
                <input
                type="teext"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="category">Category *</label>
                <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                >
                    <option value="">Select category</option>
                    <option value="Computer">Computer</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Printer">Printer</option>
                     <option value="Phone">Phone</option>
                     <option value="Tablet">Tablet</option>
                     <option value="Other">Other</option>
                     </select>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.field}>
                <label htmlFor="serialNumber">Serial Number *</label>
                <input
                type="text"
                id="serialNumber"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                required
                />
            </div>
<div className={styles.field}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Office A, Room 201"
          />
        </div>
      </div>
<div className={styles.row}>
    <div className={styles.field}>
        <label htmlFor="purchasedAt">Purchase Date</label>
        <input
        type="date"
        id="purchasedAt"
        name="purchasedAt"
        value={formData.purchasedAt}
        onChange={handleChange}
        />
    </div>
    <div ClassName={styles.field}>
        <label htmlFor="notes">Notes</label>
        <textarea
        id="notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        rows="3"
        placeholder="Additional information..."
        />
    </div>
        </div>

        <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
            {isSubmitting ? 'Creating...' : 'Add Asset'}
        </button>
    </form>
  );
}

export default AssetForm;