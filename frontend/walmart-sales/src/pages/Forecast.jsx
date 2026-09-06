import { useState } from 'react';
import axios from 'axios';

const Forecast = () => {
  const [formData, setFormData] = useState({
    store: '',
    department: '',
    date: '',
    isHoliday: false,
    temperature: '',
    fuelPrice: '',
    cpi: '',
    unemployment: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Forecast request:', formData);
    alert('Forecast feature will be connected to FastAPI backend');
  };

  const predict = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const payload = {
        Store: 1,
        Dept: 1,
        IsHoliday: 0,
        Temperature: 60,
        Fuel_Price: 3,
        MarkDown1: 0,
        MarkDown2: 0,
        MarkDown3: 0,
        MarkDown4: 0,
        MarkDown5: 0,
        CPI: 210,
        Unemployment: 8,
        Type: 1,
        Size: 150000,
        Year: 2012,
        Month: 6,
        Week: 24,
        Quarter: 2,
        Lag_1: 20000,
        Lag_4: 21000,
        Lag_52: 22000,
        Rolling_4: 20500,
        Rolling_12: 20800,
        Rolling_52: 21500
      };

      let apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      if (apiUrl.endsWith('/')) apiUrl = apiUrl.slice(0, -1);
      if (!apiUrl.startsWith('http')) apiUrl = 'https://' + apiUrl;

      const res = await axios.post(`${apiUrl}/predict`, payload);
      setPrediction(res.data.predicted_sales);
      console.log(res.data);
    } catch (err) {
      setError(err.message);
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Sales Forecast</h1>
        <p style={styles.subtitle}>
          Predict future sales using advanced machine learning models
        </p>
      </div>

      <div style={styles.formWrapper}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Store Number</label>
              <input
                type="number"
                name="store"
                value={formData.store}
                onChange={handleChange}
                placeholder="e.g., 1"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Department</label>
              <input
                type="number"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g., 1"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Temperature (°F)</label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                placeholder="e.g., 72.5"
                step="0.1"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Fuel Price ($)</label>
              <input
                type="number"
                name="fuelPrice"
                value={formData.fuelPrice}
                onChange={handleChange}
                placeholder="e.g., 3.45"
                step="0.01"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>CPI</label>
              <input
                type="number"
                name="cpi"
                value={formData.cpi}
                onChange={handleChange}
                placeholder="e.g., 211.09"
                step="0.01"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Unemployment Rate (%)</label>
              <input
                type="number"
                name="unemployment"
                value={formData.unemployment}
                onChange={handleChange}
                placeholder="e.g., 7.8"
                step="0.1"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="isHoliday"
                  checked={formData.isHoliday}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>Is Holiday Week?</span>
              </label>
            </div>
          </div>

          <button type="submit" style={styles.submitButton}>
            Generate Forecast
          </button>
        </form>

        <div style={styles.resultCard}>
          <h3 style={styles.resultTitle}>Quick Test Prediction</h3>
          
          <button 
            onClick={predict} 
            style={styles.testButton}
            disabled={loading}
          >
            {loading ? 'Predicting...' : 'Test Predict Sales'}
          </button>

          <div style={styles.resultContent}>
            {error && (
              <p style={styles.errorText}>Error: {error}</p>
            )}
            {prediction !== null && (
              <div style={styles.predictionResult}>
                <p style={styles.predictionLabel}>Predicted Sales:</p>
                <p style={styles.predictionValue}>
                  ${prediction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            )}
            {!prediction && !error && !loading && (
              <p style={styles.resultPlaceholder}>
                Click the button to test prediction with sample data
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    paddingTop: '100px',
    paddingBottom: '3rem',
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '100px 2rem 3rem',
  },
  header: {
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#fff',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#a0a0b0',
  },
  formWrapper: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
  },
  form: {
    backgroundColor: '#1a1a2e',
    padding: '2.5rem',
    borderRadius: '16px',
    border: '1px solid #2a2a3e',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: '#a0a0b0',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#16213e',
    border: '1px solid #2a2a3e',
    borderRadius: '8px',
    padding: '0.75rem',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
    marginTop: '1.5rem',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  checkboxText: {
    color: '#a0a0b0',
    fontSize: '0.9rem',
  },
  submitButton: {
    backgroundColor: '#667eea',
    color: '#fff',
    padding: '1rem 2rem',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.3s ease',
  },
  testButton: {
    backgroundColor: '#43e97b',
    color: '#0a0a0a',
    padding: '0.875rem 1.5rem',
    borderRadius: '10px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '1.5rem',
    transition: 'all 0.3s ease',
  },
  resultCard: {
    backgroundColor: '#1a1a2e',
    padding: '2.5rem',
    borderRadius: '16px',
    border: '1px solid #2a2a3e',
    height: 'fit-content',
  },
  resultTitle: {
    color: '#fff',
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
  },
  resultContent: {
    minHeight: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  resultPlaceholder: {
    color: '#a0a0b0',
    lineHeight: '1.6',
    textAlign: 'center',
    padding: '2rem 1rem',
  },
  predictionResult: {
    textAlign: 'center',
    width: '100%',
  },
  predictionLabel: {
    color: '#a0a0b0',
    fontSize: '0.95rem',
    marginBottom: '0.75rem',
  },
  predictionValue: {
    color: '#43e97b',
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: '0.95rem',
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#2a1a1a',
    borderRadius: '8px',
  },
};

// Hover and focus styles
const interactionStyles = document.createElement('style');
interactionStyles.textContent = `
  input:focus, input:hover {
    border-color: #667eea !important;
  }
  button[type="submit"]:hover {
    background-color: #5568d3 !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  button[style*="testButton"]:hover:not(:disabled) {
    background-color: #38d170 !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(67, 233, 123, 0.4);
  }
  button:disabled {
    opacity: 0.6;
    cursor: not-allowed !important;
  }
  @media (max-width: 968px) {
    div[style*="formWrapper"] {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(interactionStyles);

export default Forecast;
