const Insights = () => {
  const metrics = [
    { name: 'RMSE', value: '3,452', description: 'Root Mean Square Error' },
    { name: 'MAE', value: '2,187', description: 'Mean Absolute Error' },
    { name: 'R² Score', value: '0.94', description: 'Model Accuracy' },
    { name: 'MAPE', value: '8.5%', description: 'Mean Absolute % Error' },
  ];

  const features = [
    { name: 'Store', importance: 95, color: '#667eea' },
    { name: 'Department', importance: 88, color: '#764ba2' },
    { name: 'IsHoliday', importance: 72, color: '#f093fb' },
    { name: 'Temperature', importance: 65, color: '#4facfe' },
    { name: 'Fuel_Price', importance: 58, color: '#43e97b' },
    { name: 'CPI', importance: 45, color: '#fa709a' },
    { name: 'Unemployment', importance: 38, color: '#feca57' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Model Insights</h1>
        <p style={styles.subtitle}>
          Performance metrics and explainability analysis of the XGBoost forecasting model
        </p>
      </div>

      {/* Model Metrics Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📊 Model Performance Metrics</h2>
        <div style={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <div key={index} style={styles.metricCard}>
              <h3 style={styles.metricName}>{metric.name}</h3>
              <p style={styles.metricValue}>{metric.value}</p>
              <p style={styles.metricDescription}>{metric.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Importance Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🎯 Feature Importance</h2>
        <div style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureRow}>
              <span style={styles.featureName}>{feature.name}</span>
              <div style={styles.barContainer}>
                <div
                  style={{
                    ...styles.bar,
                    width: `${feature.importance}%`,
                    backgroundColor: feature.color,
                  }}
                ></div>
              </div>
              <span style={styles.featureValue}>{feature.importance}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* SHAP Analysis Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🔍 SHAP Analysis</h2>
        <div style={styles.shapPlaceholder}>
          <div style={styles.shapCard}>
            <h3 style={styles.shapCardTitle}>Summary Plot</h3>
            <div style={styles.shapContent}>
              <p style={styles.placeholderText}>
                📈 SHAP summary plot will visualize feature contributions
              </p>
            </div>
          </div>
          <div style={styles.shapCard}>
            <h3 style={styles.shapCardTitle}>Force Plot</h3>
            <div style={styles.shapContent}>
              <p style={styles.placeholderText}>
                🔄 SHAP force plot will explain individual predictions
              </p>
            </div>
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
    maxWidth: '1400px',
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
  section: {
    marginBottom: '3rem',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#fff',
    marginBottom: '1.5rem',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  metricCard: {
    backgroundColor: '#1a1a2e',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid #2a2a3e',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  metricName: {
    color: '#667eea',
    fontSize: '1rem',
    marginBottom: '0.75rem',
    fontWeight: 'bold',
  },
  metricValue: {
    color: '#fff',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  metricDescription: {
    color: '#a0a0b0',
    fontSize: '0.85rem',
  },
  featuresContainer: {
    backgroundColor: '#1a1a2e',
    padding: '2.5rem',
    borderRadius: '16px',
    border: '1px solid #2a2a3e',
  },
  featureRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  featureName: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '500',
    minWidth: '140px',
  },
  barContainer: {
    flex: 1,
    backgroundColor: '#16213e',
    height: '24px',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: '12px',
    transition: 'width 0.5s ease',
  },
  featureValue: {
    color: '#a0a0b0',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    minWidth: '50px',
    textAlign: 'right',
  },
  shapPlaceholder: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '2rem',
  },
  shapCard: {
    backgroundColor: '#1a1a2e',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid #2a2a3e',
  },
  shapCardTitle: {
    color: '#fff',
    fontSize: '1.3rem',
    marginBottom: '1.5rem',
  },
  shapContent: {
    backgroundColor: '#16213e',
    padding: '3rem',
    borderRadius: '12px',
    minHeight: '250px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#a0a0b0',
    fontSize: '1rem',
    textAlign: 'center',
  },
};

// Hover effect
const hoverStyle = document.createElement('style');
hoverStyle.textContent = `
  div[style*="metricCard"]:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
`;
document.head.appendChild(hoverStyle);

export default Insights;
