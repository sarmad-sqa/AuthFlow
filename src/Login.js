import React, { useState } from 'react';

function Login({ onShowSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={styles.pageBackground}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />

      <div style={styles.formContainer}>
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

          <button type="submit" style={styles.submitBtn}>
            Login
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
