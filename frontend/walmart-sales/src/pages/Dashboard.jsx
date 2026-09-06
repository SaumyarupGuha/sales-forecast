import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.get(`${apiUrl}/dashboard/stats`);
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <h2 style={styles.errorTitle}>⚠️ Error Loading Dashboard</h2>
          <p style={styles.errorText}>{error}</p>
          <button onClick={fetchDashboardStats} style={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Sales Dashboard</h1>
        <p style={styles.subtitle}>
          Real-time overview of Walmart sales performance and key metrics
        </p>
      </div>

      {/* Summary Card */}
      <div style={styles.summaryCard}>
        <div style={styles.summaryIcon}>💰</div>
        <div style={styles.summaryContent}>
          <h3 style={styles.summaryLabel}>Total Revenue</h3>
          <p style={styles.summaryValue}>{formatCurrency(stats.total_revenue)}</p>
        </div>
      </div>

      {/* Holiday Impact Card */}
      <div style={styles.holidayCard}>
        <h2 style={styles.sectionTitle}>🎉 Holiday Impact Analysis</h2>
        <div style={styles.holidayGrid}>
          <div style={styles.holidayItem}>
            <p style={styles.holidayLabel}>Non-Holiday Average</p>
            <p style={styles.holidayValue}>{formatCurrency(stats.holiday_impact.non_holiday_avg)}</p>
          </div>
          <div style={styles.holidayDivider}>→</div>
          <div style={styles.holidayItem}>
            <p style={styles.holidayLabel}>Holiday Average</p>
            <p style={{...styles.holidayValue, color: '#43e97b'}}>{formatCurrency(stats.holiday_impact.holiday_avg)}</p>
          </div>
          <div style={styles.impactBadge}>
            <span style={styles.impactText}>
              {stats.holiday_impact.impact_percentage > 0 ? '+' : ''}
              {stats.holiday_impact.impact_percentage.toFixed(1)}%
            </span>
            <span style={styles.impactLabel}>Impact</span>
          </div>
        </div>
      </div>

      {/* Top Stores and Departments Grid */}
      <div style={styles.tablesGrid}>
        {/* Top 10 Stores */}
        <div style={styles.tableCard}>
          <h2 style={styles.sectionTitle}>🏪 Top 10 Stores</h2>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeader}>Rank</th>
                  <th style={styles.tableHeader}>Store #</th>
                  <th style={{...styles.tableHeader, textAlign: 'right'}}>Total Sales</th>
                </tr>
              </thead>
              <tbody>
                {stats.top_stores.map((store, index) => (
                  <tr key={store.store} style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      <span style={getRankStyle(index + 1)}>#{index + 1}</span>
                    </td>
                    <td style={styles.tableCell}>Store {store.store}</td>
                    <td style={{...styles.tableCell, textAlign: 'right', fontWeight: 'bold', color: '#43e97b'}}>
                      {formatCurrency(store.sales)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top 10 Departments */}
        <div style={styles.tableCard}>
          <h2 style={styles.sectionTitle}>📱 Top 10 Departments</h2>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeader}>Rank</th>
                  <th style={styles.tableHeader}>Dept #</th>
                  <th style={{...styles.tableHeader, textAlign: 'right'}}>Total Sales</th>
                </tr>
              </thead>
              <tbody>
                {stats.top_departments.map((dept, index) => (
                  <tr key={dept.department} style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      <span style={getRankStyle(index + 1)}>#{index + 1}</span>
                    </td>
                    <td style={styles.tableCell}>Department {dept.department}</td>
                    <td style={{...styles.tableCell, textAlign: 'right', fontWeight: 'bold', color: '#667eea'}}>
                      {formatCurrency(dept.sales)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const getRankStyle = (rank) => {
  const baseStyle = {
    padding: '0.25rem 0.5rem',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  };

  if (rank === 1) {
    return { ...baseStyle, backgroundColor: '#ffd700', color: '#0a0a0a' };
  } else if (rank === 2) {
    return { ...baseStyle, backgroundColor: '#c0c0c0', color: '#0a0a0a' };
  } else if (rank === 3) {
    return { ...baseStyle, backgroundColor: '#cd7f32', color: '#fff' };
  } else {
    return { ...baseStyle, backgroundColor: '#2a2a3e', color: '#a0a0b0' };
  }
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
    marginBottom: '2rem',
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
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #2a2a3e',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: '#a0a0b0',
    marginTop: '1.5rem',
    fontSize: '1.1rem',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    textAlign: 'center',
  },
  errorTitle: {
    color: '#ff6b6b',
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  errorText: {
    color: '#a0a0b0',
    fontSize: '1.1rem',
    marginBottom: '2rem',
  },
  retryButton: {
    backgroundColor: '#667eea',
    color: '#fff',
    padding: '0.875rem 2rem',
    borderRadius: '10px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  summaryCard: {
    backgroundColor: '#1a1a2e',
    padding: '2.5rem',
    borderRadius: '16px',
    border: '1px solid #2a2a3e',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    marginBottom: '2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  summaryIcon: {
    fontSize: '4rem',
  },
  summaryContent: {
    flex: 1,
  },
  summaryLabel: {
    color: '#f0f0f0',
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    opacity: 0.9,
  },
  summaryValue: {
    color: '#fff',
    fontSize: '3rem',
    fontWeight: 'bold',
  },
  holidayCard: {
    backgroundColor: '#1a1a2e',
    padding: '2.5rem',
    borderRadius: '16px',
    border: '1px solid #2a2a3e',
    marginBottom: '2rem',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
  },
  holidayGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr auto',
    gap: '2rem',
    alignItems: 'center',
  },
  holidayItem: {
    textAlign: 'center',
  },
  holidayLabel: {
    color: '#a0a0b0',
    fontSize: '0.95rem',
    marginBottom: '0.75rem',
  },
  holidayValue: {
    color: '#fff',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  holidayDivider: {
    color: '#667eea',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  impactBadge: {
    backgroundColor: '#16213e',
    padding: '1.5rem',
    borderRadius: '12px',
    textAlign: 'center',
    border: '2px solid #43e97b',
  },
  impactText: {
    color: '#43e97b',
    fontSize: '2rem',
    fontWeight: 'bold',
    display: 'block',
  },
  impactLabel: {
    color: '#a0a0b0',
    fontSize: '0.9rem',
    display: 'block',
    marginTop: '0.5rem',
  },
  tablesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '2rem',
  },
  tableCard: {
    backgroundColor: '#1a1a2e',
    padding: '2.5rem',
    borderRadius: '16px',
    border: '1px solid #2a2a3e',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderRow: {
    borderBottom: '2px solid #2a2a3e',
  },
  tableHeader: {
    color: '#667eea',
    padding: '1rem',
    textAlign: 'left',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  tableRow: {
    borderBottom: '1px solid #2a2a3e',
    transition: 'background-color 0.3s ease',
  },
  tableCell: {
    color: '#a0a0b0',
    padding: '1rem',
    fontSize: '0.95rem',
  },
};

// CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  tr:hover {
    background-color: #16213e !important;
  }
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  @media (max-width: 768px) {
    div[style*="holidayGrid"] {
      grid-template-columns: 1fr !important;
      gap: 1rem !important;
    }
    div[style*="holidayDivider"] {
      transform: rotate(90deg);
    }
    div[style*="tablesGrid"] {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Dashboard;
