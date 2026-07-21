import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Walmart Sales Forecasting System</h1>
          <p style={styles.subtitle}>
            Advanced machine learning platform for predicting retail sales with precision.
            Leverage XGBoost, Optuna optimization, and SHAP explainability to make data-driven
            decisions for inventory management and revenue optimization.
          </p>
          <div style={styles.buttonGroup}>
            <Link to="/dashboard" style={styles.primaryButton}>
              View Dashboard
            </Link>
            <Link to="/forecast" style={styles.secondaryButton}>
              Forecast Sales
            </Link>
          </div>
        </div>
      </div>

      <div style={styles.features}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>📊</div>
          <h3 style={styles.featureTitle}>Real-time Analytics</h3>
          <p style={styles.featureText}>
            Monitor sales performance across stores and departments
          </p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🎯</div>
          <h3 style={styles.featureTitle}>Accurate Predictions</h3>
          <p style={styles.featureText}>
            ML-powered forecasts with XGBoost optimization
          </p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🔍</div>
          <h3 style={styles.featureTitle}>Model Insights</h3>
          <p style={styles.featureText}>
            Understand predictions with SHAP analysis
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    paddingTop: '80px',
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '6rem 2rem',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: '1.5rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#f0f0f0',
    marginBottom: '2.5rem',
    lineHeight: '1.8',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: '#fff',
    color: '#667eea',
    padding: '1rem 2.5rem',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    padding: '1rem 2.5rem',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    border: '2px solid #fff',
    transition: 'all 0.3s ease',
  },
  features: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    backgroundColor: '#1a1a2e',
    padding: '2.5rem',
    borderRadius: '16px',
    textAlign: 'center',
    border: '1px solid #2a2a3e',
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.5rem',
    color: '#fff',
    marginBottom: '1rem',
  },
  featureText: {
    color: '#a0a0b0',
    lineHeight: '1.6',
  },
};

// Hover effects
const hoverStyles = document.createElement('style');
hoverStyles.textContent = `
  @media (min-width: 769px) {
    a[style*="primaryButton"]:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
    a[style*="secondaryButton"]:hover {
      background-color: #fff;
      color: #667eea;
    }
    div[style*="featureCard"]:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem !important;
    }
    p[style*="subtitle"] {
      font-size: 1rem !important;
    }
  }
`;
document.head.appendChild(hoverStyles);

export default Home;
