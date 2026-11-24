process.env.PORT = '3001';
process.env.BROWSER = 'none';
// E2E: frontend on 3001, Express backend on 3000
process.env.REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

require('react-scripts/scripts/start');