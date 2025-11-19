import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Placeholder Icon Components (Keep only the ones used for background/navigation) ---
const CameraIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>);
const ArrowLeft = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>);

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [connectContacts, setConnectContacts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(null);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all required fields (Username, Email, Password).");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      // 🛑 CRITICAL FIX: Changed endpoint path from /auth/user/register to /auth/signup
     const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password
    }),
});

      const data = await response.json();

      if (!response.ok || data.status === 'error') {
        // If the server returns an error (e.g., email already exists)
        throw new Error(data.message || 'Registration failed due to server error.');
      }

      // --- SUCCESS ---
      alert("Registration Successful! Please log in."); 
      navigate('/login'); 

    } catch (err) {
      console.error("Registration Error:", err);
      // Display a clearer error message if the fetch failed (e.g., server offline)
      setError(err.message || "Could not connect to the API. Check your network or server status.");
      
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div
      className="min-h-screen w-full flex flex-col relative overflow-hidden bg-[#120F22]
                 bg-gradient-to-br from-[#120F22] via-[#120F22] to-[#120F22]
                 bg-[length:200%_200%]
                 animate-[bg-shift_20s_ease_infinite]"
    >
      
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 opacity-20 bg-gradient-radial from-blue-400 via-transparent to-transparent bg-[length:1000px_1000px] animate-[spot-move_15s_ease-in-out_infinite]"></div>

      {/* HEADER: Back Button and Progress Indicators */}
      <header className="sticky top-0 p-4 pt-8 z-20">
        <div className="flex justify-between items-center">
          <ArrowLeft 
            className="text-white/80 cursor-pointer hover:text-indigo-400 transition-colors" 
            onClick={() => navigate('/')} 
          />
          <h1 className="text-xl font-semibold text-white">Create Profile (1/3)</h1>
          <div className="w-1/3 flex space-x-1">
            <span className="h-1 flex-1 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50"></span>
            <span className="h-1 flex-1 bg-gray-700 rounded-full"></span>
            <span className="h-1 flex-1 bg-gray-700 rounded-full"></span>
          </div>
        </div>
      </header>

      {/* MAIN SCROLLABLE CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 z-10">
        <form onSubmit={handleRegistration} className="space-y-10">
          
          {/* 1. CREATE YOUR SAFE SPACE SECTION */}
          <section className="space-y-6">
            <h2 className="text-4xl font-extrabold text-white tracking-tight">Create Your Safe Space</h2>
            
            {/* Username Input */}
            <input
              type="text" 
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder=" Username" 
              required
              className="w-full p-4 rounded-xl bg-gray-800/60 text-white placeholder-gray-400 border border-indigo-500/30 backdrop-blur-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />

            {/* Email Input */}
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email" 
              required
              className="w-full p-4 rounded-xl bg-gray-800/60 text-white placeholder-gray-400 border border-indigo-500/30 backdrop-blur-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />

            {/* Password Input */}
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password" 
              required
              className="w-full p-4 rounded-xl bg-gray-800/60 text-white placeholder-gray-400 border border-indigo-500/30 backdrop-blur-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </section>

          {/* 2. HOW SHOULD WE SEE YOU? (Photo Upload) */}
          <section className="space-y-4 pt-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">How should we see you?</h2>
            
            <div className="p-5 flex items-center space-x-4 rounded-2xl bg-gray-800/60 border border-indigo-500/20 backdrop-blur-sm cursor-not-allowed hover:bg-gray-700/60 transition duration-300">
              <CameraIcon className="w-8 h-8 text-indigo-400" />
              <div>
                <p className="text-lg font-medium text-white">Upload a photo</p>
                <p className="text-sm text-gray-400">Optional (Image Upload Coming Soon)</p>
              </div>
            </div>
          </section>

          {/* 3. CHOOSE YOUR STYLE (Toggles) */}
          <section className="space-y-6 pt-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">Choose your style</h2>
            
            {/* Stay Anonymous Toggle */}
            <div className="flex justify-between items-center p-5 rounded-2xl bg-gray-800/60 border border-indigo-500/20 backdrop-blur-sm">
              <div>
                <p className="text-lg text-white">Stay Anonymous</p>
                <p className="text-sm text-gray-400">Your profile will be hidden from public search.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Connect Contacts Toggle */}
            <div className="flex justify-between items-center p-5 rounded-2xl bg-gray-800/60 border border-indigo-500/20 backdrop-blur-sm">
              <div>
                <p className="text-lg text-white">Connect with Contacts</p>
                <p className="text-sm text-gray-400">Find friends who are already on the platform.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={connectContacts} onChange={() => setConnectContacts(!connectContacts)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </section>
          
          {error && (
            <p className="text-center text-red-400 font-medium text-sm mt-6">{error}</p>
          )}

          {/* COMPLETE SETUP Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-indigo-600 text-white text-xl font-bold hover:bg-indigo-500 transition duration-150 shadow-xl shadow-indigo-500/40 disabled:bg-gray-600 active:translate-y-0.5"
          >
            {isSubmitting ? 'Setting Up...' : 'Complete Setup'}
          </button>

          {/* Footer Text */}
          <p className="mt-4 text-center text-sm text-gray-400 space-y-1 pb-10">
            <span className="block">Already have an account? <a href="#" onClick={(e) => {e.preventDefault(); navigate('/login')}} className="text-sky-400 font-medium hover:underline">Log in</a></span>
            <span className="block text-xs">By continuing, you agree to our <a href="#" className="text-sky-400 hover:underline">Terms of Service</a> and <a href="#" className="text-sky-400 hover:underline">Privacy Policy</a>.</span>
          </p>

        </form>
      </main>
      
    </div>
  );
}