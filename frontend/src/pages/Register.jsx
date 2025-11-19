import React, { useState } from 'react';
// Only need useNavigate, as HashRouter is no longer required.
import { useNavigate } from 'react-router-dom'; 

// --- Placeholder Icon Components (Lucide Icons used via SVG) ---
const CameraIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>);
const ArrowLeft = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>);

// Component to encapsulate the CSS keyframes, preventing potential JSX rendering conflicts.
const BackgroundStyles = () => (
  <style>{`
    @keyframes bg-shift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes spot-move {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .bg-gradient-radial {
      background-image: radial-gradient(circle at center, var(--tw-gradient-stops));
    }
  `}</style>
);


// This is the exported component, relying on the Router setup in App.jsx.
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
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(null);
    setSuccessMessage(null);
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
    setSuccessMessage(null); 
    
    try {
      // Confirmed working URL, hardcoded to avoid environment variable issues.
      const API_ENDPOINT = 'https://foss-project-burgundy.onrender.com/api/v1/auth/user/register';
      
      const response = await fetch(API_ENDPOINT, {
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
        throw new Error(data.message || 'Registration failed: Server responded with an error.');
      }

      // --- SUCCESS ---
      setSuccessMessage("Registration Successful! Redirecting to login...");
      
      setTimeout(() => {
        navigate('/login'); 
      }, 1500);

    } catch (err) {
      console.error("Registration Error:", err);
      
      const errorMsg = err.message.includes('fetch') || err.message.includes('NetworkError')
        ? "🚨 Cross-Origin (CORS) Security Block. The browser is blocking this request. Please contact the backend developer to update their allowed origins list on Render."
        : err.message;
        
      setError(errorMsg);
      
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
      
      {/* Background Animation Styles */}
      <BackgroundStyles />
      
      <div className="absolute inset-0 z-0 opacity-20 bg-gradient-radial from-blue-400 via-transparent to-transparent bg-[length:1000px_1000px] animate-[spot-move_15s_ease-in-out_infinite]"></div>

      {/* HEADER: Back Button and Progress Indicators */}
      <header className="sticky top-0 p-4 pt-8 z-20">
        <div className="flex justify-between items-center">
          <ArrowLeft 
            className="text-white/80 cursor-pointer hover:text-indigo-400 transition-colors" 
            onClick={() => navigate('/')} 
          />
          <h1 className="text-xl font-semibold text-white">Create Profile (1/2)</h1>
          <div className="w-1/3 flex space-x-1">
             <span className="h-1 flex-1 bg-indigo-500 rounded-full"></span>
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
              placeholder=" Choose a Username" 
              required
              className="w-full p-4 rounded-xl bg-gray-800/60 text-white placeholder-gray-400 border border-indigo-500/30 backdrop-blur-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />

            {/* Email Input */}
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email" 
              required
              className="w-full p-4 rounded-xl bg-gray-800/60 text-white placeholder-gray-400 border border-indigo-500/30 backdrop-blur-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />

            {/* Password Input */}
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" Create a Password" 
              required
              className="w-full p-4 rounded-xl bg-gray-800/60 text-white placeholder-gray-400 border border-indigo-500/30 backdrop-blur-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </section>

          {/* 2. HOW SHOULD WE SEE YOU? (Photo Upload) */}
          <section className="space-y-4 pt-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">How should we see you?</h2>
            
            <div className="p-5 flex items-center space-x-4 rounded-2xl bg-gray-800/60 border border-indigo-500/20 backdrop-blur-sm cursor-not-allowed opacity-70 transition duration-300">
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
          
          {/* Status Messages */}
          {error && (
            <div className="bg-red-900/40 border border-red-500/50 p-3 rounded-lg text-center text-red-300 font-medium text-sm mt-6">{error}</div>
          )}
          
          {successMessage && (
            <div className="bg-green-900/40 border border-green-500/50 p-3 rounded-lg text-center text-green-300 font-medium text-sm mt-6">{successMessage}</div>
          )}

          {/* COMPLETE SETUP Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-indigo-600 text-white text-xl font-bold hover:bg-indigo-500 transition duration-150 shadow-xl shadow-indigo-500/40 disabled:bg-gray-600 active:translate-y-0.5"
          >
            {isSubmitting ? 'Setting Up...' : 'Complete setup'}
          </button>

          {/* Footer Text */}
          <p className="mt-4 text-center text-sm text-gray-400 space-y-1 pb-10">
            <span className="block">Already have an account? <a href="#" onClick={(e) => {e.preventDefault(); navigate('/login')}} className="text-sky-400 font-medium hover:underline">Log in</a></span>
            <span className="block text-xs">By continuing, you agree to our <a href="#" onClick={(e) => {e.preventDefault(); alert("Terms of Service placeholder")}} className="text-sky-400 hover:underline">Terms of Service</a> and <a href="#" onClick={(e) => {e.preventDefault(); alert("Privacy Policy placeholder")}} className="text-sky-400 hover:underline">Privacy Policy</a>.</span>
          </p>

        </form>
      </main>
      
    </div>
  );
}