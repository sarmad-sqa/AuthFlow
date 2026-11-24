// Backend base URL — local default 3001; CI/e2e sets REACT_APP_API_URL to 3000
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';