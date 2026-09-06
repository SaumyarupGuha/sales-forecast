import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Forecast Sales', path: '/forecast' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          Walmart Sales Forecasting
        </Link>

        {/* Desktop Menu */}
        <div style={styles.desktopMenu}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.navLink,
                ...(isActive(item.path) ? styles.activeLink : {}),
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={styles.menuButton}
          aria-label="Toggle menu"
        >
          <div style={styles.hamburger}>
            <span style={{ ...styles.bar, ...(isOpen ? styles.barOpen1 : {}) }}></span>
            <span style={{ ...styles.bar, ...(isOpen ? styles.barOpen2 : {}) }}></span>
            <span style={{ ...styles.bar, ...(isOpen ? styles.barOpen3 : {}) }}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={styles.mobileMenu}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.mobileLink,
                ...(isActive(item.path) ? styles.activeMobileLink : {}),
              }}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1a2e',
    borderBottom: '1px solid #2a2a3e',
    zIndex: 1000,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
    textDecoration: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  desktopMenu: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  navLink: {
    color: '#a0a0b0',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
  },
  activeLink: {
    color: '#fff',
    backgroundColor: '#2a2a3e',
  },
  menuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  hamburger: {
    width: '24px',
    height: '20px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bar: {
    width: '100%',
    height: '3px',
    backgroundColor: '#fff',
    borderRadius: '3px',
    transition: 'all 0.3s ease',
  },
  barOpen1: {
    transform: 'rotate(45deg) translate(5px, 8px)',
  },
  barOpen2: {
    opacity: 0,
  },
  barOpen3: {
    transform: 'rotate(-45deg) translate(5px, -8px)',
  },
  mobileMenu: {
    display: 'none',
    flexDirection: 'column',
    backgroundColor: '#16213e',
    padding: '1rem',
    borderTop: '1px solid #2a2a3e',
  },
  mobileLink: {
    color: '#a0a0b0',
    textDecoration: 'none',
    padding: '1rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  },
  activeMobileLink: {
    color: '#fff',
    backgroundColor: '#2a2a3e',
  },
};

// Media query for mobile
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @media (max-width: 768px) {
    nav > div > div:nth-child(2) {
      display: none !important;
    }
    nav > div > button {
      display: block !important;
    }
    nav > div:last-child {
      display: flex !important;
    }
  }
  nav a:hover {
    color: #fff !important;
    background-color: #2a2a3e !important;
  }
`;
document.head.appendChild(styleSheet);

export default Navbar;
