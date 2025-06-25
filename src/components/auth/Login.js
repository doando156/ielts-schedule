import React, { useState } from 'react';
import { login } from '../../api/auth';
import './Auth.css';

const Login = ({ onLogin, onRegisterClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Vui lòng nhập tài khoản và mật khẩu');
      return;
    }
    
    try {
      setLoading(true);
      const data = await login(username, password);
      onLogin({
        username: data.username,
        isLoggedIn: true,
        token: data.token
      });
    } catch (error) {
      setError(typeof error === 'string' ? error : 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-header">
          <img 
            src={`${process.env.PUBLIC_URL}/Ilets_avatar.png`} 
            alt="IELTS Schedule" 
            className="auth-logo" 
          />
          <h2>IELTS Study Schedule</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Tài khoản</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tài khoản"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
          
          <div className="auth-link">
            <p>Chưa có tài khoản? <button type="button" onClick={onRegisterClick} className="link-button">Đăng ký</button></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;