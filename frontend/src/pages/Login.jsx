import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { toast } from 'sonner';

export default function EmpathyBuddyLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (isSubmitting) return;

    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await loginUser({ email, password });
      const { token } = res.data;
      toast.success('Login successful. Redirecting.');
      localStorage.setItem('token', token);
      setTimeout(() => navigate('/mood'), 1000);
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a3e] to-[#0f0f1e] flex flex-col items-center justify-between p-6 text-white">
      <div className="w-full max-w-md flex flex-col items-center justify-center flex-grow">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-12 h-12 bg-[#4F46E5] rounded-full flex items-center justify-center">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" />
              <line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Empathy Buddy</h1>
        </div>

        <div className="w-full space-y-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-gray-400 text-lg">Log in to continue your conversations.</p>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a4e] border border-[#3a3a5e] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a4e] border border-[#3a3a5e] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-[#2a2a4e]" />
                <span className="text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-[#4F46E5] hover:text-[#6366F1]">
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleLogin}
              disabled={isSubmitting}
              className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold py-4 px-6 rounded-full transition-colors duration-200"
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
          </div>

          <div className="text-center pt-4">
            <p className="text-gray-400">
              Dont have an account?{' '}
              <a href="/register" className="text-[#4F46E5] hover:text-[#6366F1] font-semibold">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-8">
        <p className="text-gray-500 text-sm">Join 10,000+ people finding support</p>
      </div>
    </div>
  );
}