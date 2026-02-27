import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("hereinsubmit")
    const response =await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
const json = await response.json();
    console.log(json);
    alert(json.message)
    // alert("Reset link sent");
  };

  return (
    
      /* <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button>Send Link</button> */
      <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <span style={{ fontSize: '40px' }}>📧</span>
        </div>
        <h2 style={styles.title}>Forgot Password?</h2>
        <p style={styles.subtitle}>
          No worries! Enter your email below and we'll send you a reset link.
        </p>

        <form onSubmit={submitHandler} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              placeholder="hello@example.com" 
              style={styles.input} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" style={styles.primaryButton}>
            Send Reset Link
          </button>
        </form>

        <a href="/login" style={styles.backLink}>← Back to Login</a>
      </div>
    </div>
    
  );
}
const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  iconContainer: {
    width: '80px',
    height: '80px',
    background: '#f0f4ff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 20px auto',
  },
  title: { color: '#1a202c', marginBottom: '10px', fontSize: '24px' },
  subtitle: { color: '#718096', fontSize: '14px', marginBottom: '30px', lineHeight: '1.5' },
  inputGroup: { textAlign: 'left', marginBottom: '20px' },
  label: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  primaryButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, background 0.2s',
  },
  backLink: {
    display: 'block',
    marginTop: '20px',
    color: '#718096',
    textDecoration: 'none',
    fontSize: '14px',
  }
};
export default ForgotPassword;