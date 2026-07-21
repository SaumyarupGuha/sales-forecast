const About = () => {
  const technologies = [
    {
      name: 'React',
      icon: '⚛️',
      description: 'Modern frontend library for building interactive user interfaces',
      color: '#61dafb',
    },
    {
      name: 'FastAPI',
      icon: '⚡',
      description: 'High-performance Python web framework for building APIs',
      color: '#009688',
    },
    {
      name: 'XGBoost',
      icon: '🌳',
      description: 'Gradient boosting algorithm for accurate sales predictions',
      color: '#ff6f00',
    },
    {
      name: 'Optuna',
      icon: '🎯',
      description: 'Hyperparameter optimization framework for ML models',
      color: '#667eea',
    },
    {
      name: 'SHAP',
      icon: '🔍',
      description: 'Explainable AI tool for understanding model predictions',
      color: '#f093fb',
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>About This Project</h1>
        <p style={styles.subtitle}>
          Building an intelligent sales forecasting system for Walmart
        </p>
      </div>

      {/* Project Overview */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📋 Project Overview</h2>
        <div style={styles.overviewCard}>
          <p style={styles.paragraph}>
            The Walmart Sales Forecasting System is a full-stack machine learning application
            designed to predict weekly sales for Walmart stores across multiple departments.
            By leveraging historical sales data, economic indicators, and holiday information,
            the system provides accurate forecasts to support inventory management and business
            decision-making.
          </p>
          <p style={styles.paragraph}>
            The project combines cutting-edge machine learning techniques with modern web
            technologies to deliver a professional, user-friendly forecasting platform.
          </p>
        </div>
      </div>

      {/* Technology Stack */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🛠️ Technology Stack</h2>
        <div style={styles.techGrid}>
          {technologies.map((tech, index) => (
            <div key={index} style={styles.techCard}>
              <div style={{ ...styles.techIcon, color: tech.color }}>{tech.icon}</div>
              <h3 style={styles.techName}>{tech.name}</h3>
              <p style={styles.techDescription}>{tech.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🏗️ System Architecture</h2>
        <div style={styles.architectureCard}>
          <div style={styles.archSection}>
            <h3 style={styles.archTitle}>Frontend (React + Vite)</h3>
            <ul style={styles.archList}>
              <li style={styles.archItem}>React Router for seamless navigation</li>
              <li style={styles.archItem}>Responsive design for all devices</li>
              <li style={styles.archItem}>Interactive data visualization</li>
              <li style={styles.archItem}>Real-time prediction interface</li>
            </ul>
          </div>

          <div style={styles.archDivider}>↕️</div>

          <div style={styles.archSection}>
            <h3 style={styles.archTitle}>Backend (FastAPI)</h3>
            <ul style={styles.archList}>
              <li style={styles.archItem}>RESTful API endpoints</li>
              <li style={styles.archItem}>XGBoost model serving</li>
              <li style={styles.archItem}>Data preprocessing pipeline</li>
              <li style={styles.archItem}>SHAP explainability integration</li>
            </ul>
          </div>

          <div style={styles.archDivider}>↕️</div>

          <div style={styles.archSection}>
            <h3 style={styles.archTitle}>Machine Learning</h3>
            <ul style={styles.archList}>
              <li style={styles.archItem}>XGBoost regression model</li>
              <li style={styles.archItem}>Optuna hyperparameter tuning</li>
              <li style={styles.archItem}>Feature engineering</li>
              <li style={styles.archItem}>Model evaluation and monitoring</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>✨ Key Features</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>📊</span>
            <p style={styles.featureText}>Real-time sales dashboard</p>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>🎯</span>
            <p style={styles.featureText}>Accurate ML predictions</p>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>🔍</span>
            <p style={styles.featureText}>Model explainability with SHAP</p>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>📱</span>
            <p style={styles.featureText}>Mobile-responsive design</p>
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
    textAlign: 'center',
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
  section: {
    marginBottom: '3rem',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#fff',
    marginBottom: '1.5rem',
  },
  overviewCard: {
    backgroundColor: '#1a1a2e',
    padding: '2.5rem',
    borderRadius: '16px',
    border: '1px solid #2a2a3e',
  },
  paragraph: {
    color: '#a0a0b0',
    lineHeight: '1.8',
    fontSize: '1.05rem',
    marginBottom: '1.5rem',
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  techCard: {
    backgroundColor: '#1a1a2e',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid #2a2a3e',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  techIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  techName: {
    color: '#fff',
    fontSize: '1.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  techDescription: {
    color: '#a0a0b0',
    lineHeight: '1.6',
    fontSize: '0.95rem',
  },
  architectureCard: {
    backgroundColor: '#1a1a2e',
    padding: '2.5rem',
    borderRadius: '16px',
    border: '1px solid #2a2a3e',
  },
  archSection: {
    marginBottom: '2rem',
  },
  archTitle: {
    color: '#667eea',
    fontSize: '1.3rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  archList: {
    listStyle: 'none',
    padding: 0,
  },
  archItem: {
    color: '#a0a0b0',
    padding: '0.75rem 0',
    paddingLeft: '1.5rem',
    position: 'relative',
    fontSize: '1rem',
  },
  archDivider: {
    textAlign: 'center',
    fontSize: '2rem',
    margin: '1.5rem 0',
    color: '#667eea',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
  },
  featureItem: {
    backgroundColor: '#1a1a2e',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid #2a2a3e',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    fontSize: '2.5rem',
    display: 'block',
    marginBottom: '1rem',
  },
  featureText: {
    color: '#a0a0b0',
    fontSize: '1rem',
    fontWeight: '500',
  },
};

// Bullet points styling and hover effects
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  li[style*="archItem"]::before {
    content: "▸";
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
  }
  div[style*="techCard"]:hover, div[style*="featureItem"]:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
`;
document.head.appendChild(additionalStyles);

export default About;
