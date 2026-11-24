import React, { useEffect, useState } from 'react';

function Login({ onShowSignup }) {
  // Password show/hide ke liye state
  const [showPassword, setShowPassword] = useState(false);

  // Kaunsa input focused hai — border highlight ke liye
  const [focusedField, setFocusedField] = useState(null);

  // Email aur password form values
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Login button dabate waqt loading dikhane ke liye
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success / error toast message
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Toast 5 seconds baad khud hide ho jaye
  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setToastMessage(''), 5000);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const styles = {
    pageBackground: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      background: 'linear-gradient(135deg, #104153 0%, #156d81 100%)',
      fontFamily: "'Poppins', sans-serif"
    },
    formContainer: {
      maxWidth: '420px',
      width: '100%',
      padding: 'clamp(24px, 8vw, 40px)',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxSizing: 'border-box'
    },
    logoContainer: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    logo: {
      width: '60px',
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
      color: '#104153',
      fontSize: '26px',
      fontWeight: '600'
    },
    formGroup: {
      marginBottom: '25px',
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      marginBottom: '10px',
      fontWeight: '500',
      color: '#444',
      fontSize: '15px'
    },
    input: {
      padding: '14px 18px',
      borderRadius: '10px',
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
      padding: '14px 50px 14px 18px',
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
      color: '#888',
      display: 'flex',
      alignItems: 'center',
      userSelect: 'none'
    },
    submitBtn: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#156d81',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      boxSizing: 'border-box',
      boxShadow: '0 4px 10px rgba(21, 109, 129, 0.3)'
    },
    signupText: {
      marginTop: '22px',
      marginBottom: '0',
      textAlign: 'center',
      fontSize: '14px',
      color: '#666'
    },
    signupLink: {
      color: '#156d81',
      fontWeight: '600'
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
    }
  };

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

  // Input change hone par formData update karte hain
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Login form submit — backend /login API call
  const handleSubmit = async (e) => {
    // Page refresh rokte hain
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Backend login API ko call karte hain (port 3001)
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      // Server ka JSON response padhte hain
      let responseData = {};
      try {
        responseData = await response.json();
      } catch {
        // Agar JSON na mile toh status se message banayenge
      }

      // Agar login fail ho (401 / 400 / 500)
      if (!response.ok) {
        setToastType('error');
        setToastMessage(
          responseData.message || `Login failed (HTTP ${response.status}).`
        );
        return;
      }

      // Login successful
      setToastType('success');
      setToastMessage(
        responseData.user?.username
          ? `Welcome back, ${responseData.user.username}!`
          : 'Login successful!'
      );
    } catch {
      // Backend band ho ya network error
      setToastType('error');
      setToastMessage('Unable to connect to the login server. Please try again.');
    } finally {
      // Button dubara enable
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.pageBackground}>
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
          <div style={styles.logo}>∆</div>
        </div>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="login-email" style={styles.label}>Email Address:</label>
            <input
              id="login-email"
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
            <label htmlFor="login-password" style={styles.label}>Password:</label>
            <div style={styles.passwordWrapper}>
              <input
                id="login-password"
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
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button type="submit" style={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={styles.signupText}>
          Don&apos;t have an account?{' '}
          <a
            href="#signup"
            onClick={(e) => {
              e.preventDefault();
              onShowSignup();
            }}
            style={styles.signupLink}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;