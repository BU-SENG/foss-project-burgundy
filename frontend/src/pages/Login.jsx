import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await loginUser(formData);
      toast.success('Login successful! Redirecting...');
      localStorage.setItem('token', user.token);
      setTimeout(() => navigate('/mood'), 1000);
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md bg-gray-800 p-6 rounded-xl">
        <h2 className="text-2xl text-white font-bold text-center">Login</h2>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-400"
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-gray-700 text-white placeholder-gray-400"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-500 transition"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}