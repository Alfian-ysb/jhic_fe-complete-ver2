import React, { useState } from "react";
import AuthCard from "../components/AuthCard";
import { TextInput, PasswordInput } from "../components/inputs";
import { Toaster } from "react-hot-toast";
import { showToast } from "../components/toast";
import { API_ENDPOINTS, apiCall } from "../utils/api";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(password !== passwordConfirm) {
      showToast("warning", "password do not match")
      return;
    }else{
      const res = await apiCall(API_ENDPOINTS.register, {
        method: 'POST',
        body: JSON.stringify({ username, email, password})
      })

    const data = await res.json();

    if (res.ok){
      localStorage.setItem('token', data.token);
      window.location.href = '/login';
    }else{
      alert(data.message);
    }
    }
  };

  return (
    <AuthCard title="Sign Up">
      <form onSubmit={handleSubmit} className="flex flex-col w-[80%]" noValidate>
        <TextInput id="username" label="username" value={username} onChange={setUsername} type="text" placeholder="Username" required/>
        
        <TextInput id="email" label="Email" value={email} onChange={setEmail} type="email" placeholder="you@example.com" required />

        <PasswordInput id="password" label="Password" value={password} onChange={setPassword} show={showPassword} onToggleShow={setShowPassword} minLength={8} />

          {passwordConfirm && password !== passwordConfirm && (
            <p className="text-red-500 text-sm mb-3">*Password does not match</p>
          )}

        <PasswordInput id="passwordConfirm" label="Confirm Password" value={passwordConfirm} onChange={setPasswordConfirm} show={showPasswordConfirm} onToggleShow={setShowPasswordConfirm} minLength={8} />
          
          {passwordConfirm && password !== passwordConfirm && (
            <p className="text-red-500 text-sm mb-3">*Password does not match</p>
          )}

          <div className="flex items-center gap-2 text-sm mb-10">
            <p>Already have an account?</p>
            <a href="/login" className="text-blue-600">Sign In</a>
          </div>

        <button type="submit" className="w-full md:h-16 h-14 bg-[#0B4CF0] text-white mb-20 rounded-2xl md:text-2xl text font-poppins">Create an Account</button>
      </form>
      <Toaster position="top-right"/>
    </AuthCard>
  );
};

export default Signup;