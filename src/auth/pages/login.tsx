import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import { TextInput, PasswordInput } from '../components/inputs';
import { Toaster } from 'react-hot-toast';
import { showToast } from '../components/toast';
import { AuthContext } from '../components/authContext';
import { API_ENDPOINTS, apiCall } from '../utils/api';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return showToast('warning', 'Please enter email and password');
    if (!email.includes('@')) return showToast('warning', 'Please enter a valid email');

    try {
      const res = await apiCall(API_ENDPOINTS.login, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.user);
        showToast('success', 'Login successful!');
        navigate('/');
      } else {
        const text = await res.text();
        showToast('error', text || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'Something went wrong');
    }
  };

  return (
<AuthCard title="Sign in">
      <form onSubmit={handleSubmit} className="flex flex-col w-[80%]" noValidate>
        <TextInput id="email" label="Email" value={email} onChange={setEmail} type="email" placeholder="you@example.com" required />

        <PasswordInput id="password" label="Password" value={password} onChange={setPassword} show={showPassword} onToggleShow={setShowPassword} minLength={8} />

        <div className="flex items-center justify-between md:mb-20 w-full mb-7">

          <div className="flex items-center gap-2 text-sm">
            <p>Don't have an account yet?</p>
            <a href="/signup" className="text-blue-600">Sign up</a>
          </div>
        </div>

        <button type="submit" className="w-full md:h-16 h-12 bg-[#0B4CF0] text-white md:mb-16 rounded-2xl md:text-2xl text font-poppins">Sign in</button>
        <Toaster position="top-right"/>
      </form>
    </AuthCard>
  );
};

export default Login;
