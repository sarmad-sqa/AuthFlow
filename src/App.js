import React, { useEffect, useState } from 'react';
import Login from './Login';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setToastMessage(''), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      let responseData = {};
      try {
        responseData = await response.json();
      } catch {
        // Use the HTTP status when the server does not return JSON.
      }

      if (response.status !== 201) {
        setToastType('error');
        setToastMessage(
          responseData.message || `Signup failed (HTTP ${response.status}).`
        );
        return;
      }

      setFormData({
        username: '',
        email: '',
        password: ''
      });
      setTermsAccepted(false);
      setToastType('success');
      setToastMessage('Signup submitted successfully!');
    } catch {
      setToastType('error');
      setToastMessage('Unable to connect to the signup server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // --- NEW, IMPROVED STYLING OBJECTS ---
  const styles = {
    pageBackground: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // Elegant deep teal/blue gradient background
      background: 'linear-gradient(135deg, #104153 0%, #156d81 100%)',
      fontFamily: "'Poppins', sans-serif" // Clean modern font
    },
    formContainer: {
      maxWidth: '420px',
      width: '100%',
      padding: '40px',
      borderRadius: '16px', // Softer corners
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)', // deeper, softer shadow
      backgroundColor: 'rgba(255, 255, 255, 0.95)', // Subtle transparency
      boxSizing: 'border-box'
    },
    logoContainer: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    logo: {
      width: '60px', // Placeholder logo size
      height: '60px',
      backgroundColor: '#104153',
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      color: 'white'
    },
    heading: {
      textAlign: 'center',
      marginBottom: '35px',
      color: '#104153', // Match logo color
      fontSize: '26px',
      fontWeight: '600'
    },
    formGroup: {
      marginBottom: '25px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    },
    label: {
      marginBottom: '10px',
      fontWeight: '500',
      color: '#444',
      fontSize: '15px'
    },
    input: {
      padding: '14px 18px',
      borderRadius: '10px', // Rounder fields
      border: '1px solid #ddd',
      fontSize: '16px',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: '#fdfdfd',
      transition: 'border-color 0.2s, box-shadow 0.2s'
    },
    inputFocus: {
      borderColor: '#156d81',
      boxShadow: '0 0 0 3px rgba(21, 109, 129, 0.2)'
    },
    passwordWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    passwordInput: {
      padding: '14px 50px 14px 18px', // space for eye icon
      borderRadius: '10px',
      border: '1px solid #ddd',
      fontSize: '16px',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: '#fdfdfd',
      transition: 'border-color 0.2s, box-shadow 0.2s'
    },
    eyeButton: {
      position: 'absolute',
      right: '16px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '20px',
      padding: '0',
      color: '#888', // Subtle icon color
      display: 'flex',
      alignItems: 'center',
      userSelect: 'none'
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '30px'
    },
    submitBtn: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#156d81', // Matching theme
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      boxSizing: 'border-box',
      transition: 'background-color 0.2s, transform 0.1s',
      boxShadow: '0 4px 10px rgba(21, 109, 129, 0.3)'
    },
    submitBtnHover: {
      backgroundColor: '#0d5a6c'
    },
    termsGroup: {
      marginTop: '5px',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      color: '#666',
      fontSize: '14px'
    },
    checkbox: {
      marginRight: '10px',
      cursor: 'pointer',
      accentColor: '#156d81' // modern checkbox color
    },
    toast: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1,
      padding: '14px 20px',
      borderRadius: '8px',
      backgroundColor: '#1f7a4d',
      color: 'white',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      fontSize: '14px'
    },
    errorToast: {
      backgroundColor: '#c0392b'
    },
    warningText: {
      marginTop: '30px',
      textAlign: 'center',
      color: '#e74c3c',
      fontWeight: '500',
      fontSize: '14px',
      borderTop: '1px solid #eee',
      paddingTop: '18px'
    },
    dev1SupportText: {
      marginTop: '15px',
      textAlign: 'center',
      fontSize: '13px',
      color: '#888'
    }
  };

  // State to track focus for outline styling
  const [focusedField, setFocusedField] = useState(null);

  const getInputStyle = (fieldName) => {
    return focusedField === fieldName
      ? { ...styles.input, ...styles.inputFocus }
      : styles.input;
  };

  const getPasswordInputStyle = () => {
    return focusedField === 'password'
      ? { ...styles.passwordInput, ...styles.inputFocus }
      : styles.passwordInput;
  };

  return showLogin ? (
    <Login onShowSignup={() => setShowLogin(false)} />
  ) : (
    <div style={styles.pageBackground}>
      {/* Add Poppins font link to head */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />

      <div style={styles.formContainer}>
        {toastMessage && (
          <div
            role={toastType === 'error' ? 'alert' : 'status'}
            aria-live={toastType === 'error' ? 'assertive' : 'polite'}
            style={toastType === 'error'
              ? { ...styles.toast, ...styles.errorToast }
              : styles.toast}
          >
            {toastMessage}
          </div>
        )}
        <div style={styles.logoContainer}>
          <div style={styles.logo}>∆</div> {/* Placeholder Logo Icon */}
        </div>
        <h2 style={styles.heading}>Signup Form</h2>
        <form onSubmit={handleSubmit}>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => setFocusedField('username')}
              onBlur={() => setFocusedField(null)}
              style={getInputStyle('username')}
              required
              placeholder="Enter your username" // added placeholders
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              style={getInputStyle('email')}
              required
              placeholder="Enter your email address"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                style={getPasswordInputStyle()}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={styles.eyeButton}
              >
               {showPassword ?'👁️': '👁️‍🗨️' }
              </button>
            </div>
          </div>

          <div style={styles.termsGroup}>
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              style={styles.checkbox}
              required
            />
            <label htmlFor="terms">Accept our Terms and Conditions</label>
          </div>
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>

        </form>

        <p style={styles.dev1SupportText}>
          Already have an account?{' '}
          <a
            href="#login"
            onClick={(e) => {
              e.preventDefault();
              setShowLogin(true);
            }}
            style={{ color: '#156d81', fontWeight: '600' }}
          >
            Log In
          </a>
        </p>

        <p style={styles.warningText}>
          Warning: Do not share your OTP with anyone!
        </p>

        <p style={styles.dev1SupportText}>
          Need help? Contact support@pixelbyprism.com
        </p>

      </div>
    </div>
  );
}

export default App;