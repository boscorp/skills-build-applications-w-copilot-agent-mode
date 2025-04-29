// Configuration for API URLs and other global settings
const config = {
  // Using environment variable URL or the GitHub codespace URL - adjust as needed
  API_BASE_URL: process.env.REACT_APP_API_URL || 'https://fuzzy-fiesta-4gv6jqqgqp534gj-8000.app.github.dev',
  APP_NAME: 'OctoFit Tracker',
  SCHOOL_NAME: 'Mergington High School',
  VERSION: '1.0.0',
  COPYRIGHT_YEAR: new Date().getFullYear(),
  
  // Default API options for fetch
  API_OPTIONS: {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include' // Include cookies for session auth if needed
  },
  
  // App theme colors - matches CSS variables in App.css
  THEME: {
    primary: '#3066BE',
    secondary: '#119DA4',
    success: '#2E7D32',
    info: '#039BE5',
    warning: '#FFA000',
    danger: '#D32F2F'
  }
};

export default config;
