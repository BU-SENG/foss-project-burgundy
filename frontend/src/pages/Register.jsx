import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { registerUser } from '../services/authService';
import BackgroundStyles from '../components/RegisterBackgroundStyles';
import { toast } from 'sonner';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.username || !formData.email || !formData.password) {
      toast.error('Please fill all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser(formData);
      toast.success('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      toast.error(err.message || 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#120F22]">
      <BackgroundStyles />
      <header className="sticky top-0 p-4 z-20 flex justify-between items-center">
        <ArrowLeft className="text-white cursor-pointer" onClick={() => navigate('/')} />
        <h1 className="text-xl text-white">Create Profile</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full p-4 rounded-xl bg-gray-800/60 text-white"
          />
          <input
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            type="email"
            className="w-full p-4 rounded-xl bg-gray-800/60 text-white"
          />
          <input
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            type="password"
            className="w-full p-4 rounded-xl bg-gray-800/60 text-white"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl"
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      </main>
    </div>
  );
}
