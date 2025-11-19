import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Settings, LogOut, MessageCircle, 
  Users, UserPlus, Smile, Star, Search 
} from 'lucide-react';

// Helper to map backend enum values to Emojis
const getMoodEmoji = (mood) => {
  switch (mood?.toLowerCase()) {
    case 'happy': return '😊';
    case 'content': return '😌';
    case 'calm': return '🧘';
    case 'neutral': return '😐';
    case 'anxious': return '😰';
    case 'sad': return '😢';
    case 'excited': return '🤩';
    case 'overwhelmed': return '😵‍💫';
    default: return null; // Return null to fall back to the generic icon
  }
};

export default function HomePage() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // --- STATE: User's Current Mood ---
  // Currently hardcoded to 'content' for demo. 
  // In the future, fetch this from your backend when the page loads.
  const [currentMood, setCurrentMood] = useState('content'); 

  // Mock data for recent chats
  const activeChats = [
    { id: 1, name: "Sarah Jenkins", message: "I totally get that feeling...", time: "2m", avatar: null, unread: 2 },
    { id: 2, name: "David K.", message: "Thanks for listening.", time: "1h", avatar: null, unread: 0 },
    { id: 3, name: "Empathy Bot", message: "How is your mood shifting?", time: "1d", avatar: null, unread: 0 },
  ];

  const handleLogout = () => {
    // Add logout logic here (clear localStorage, etc.)
    console.log("Logging out...");
    navigate('/'); // Redirect to Welcome page
  };

  // Determine what icon to show in the center button
  const MoodIcon = getMoodEmoji(currentMood);

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#120F22] text-white relative overflow-hidden font-sans">
      
      {/* --- Background Animation --- */}
      <style>{`
        @keyframes spot-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .bg-gradient-radial {
          background-image: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
      <div className="absolute inset-0 z-0 opacity-20 bg-gradient-radial from-blue-400 via-transparent to-transparent bg-[length:1000px_1000px] animate-[spot-move_15s_ease-in-out_infinite]"></div>


      {/* --- TOP HEADER --- */}
      <header className="sticky top-0 z-30 px-6 py-5 flex justify-between items-center bg-[#120F22]/80 backdrop-blur-md border-b border-white/5">
        <h1 className="text-2xl font-bold tracking-tight text-white">Chats</h1>
        
        {/* User Profile Icon & Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 hover:bg-indigo-600/40 transition-colors"
          >
            <User size={20} />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <>
              {/* Backdrop to close menu */}
              <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
              
              <div className="absolute right-0 top-12 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="p-3 border-b border-gray-800">
                  <p className="text-sm font-medium text-white">My Account</p>
                  <p className="text-xs text-gray-400">user@example.com</p>
                </div>
                <button 
                  onClick={() => navigate('/settings')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-left"
                >
                  <Settings size={16} /> Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors text-left"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            </>
          )}
        </div>
      </header>


      {/* --- MAIN CONTENT (Chat List) --- */}
      <main className="flex-1 overflow-y-auto z-10 pb-24 pt-2">
        {/* Search Bar */}
        <div className="px-6 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        {/* Recent Chats List */}
        <div className="space-y-1">
          {activeChats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer active:bg-white/10"
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {chat.name.charAt(0)}
                </div>
                {/* Online Indicator */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#120F22]"></div>
              </div>

              {/* Message Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-white truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-400 truncate">{chat.message}</p>
              </div>

              {/* Unread Badge */}
              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>


      {/* --- BOTTOM NAVIGATION BAR --- */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#120F22]/90 backdrop-blur-lg border-t border-white/5 z-40 pb-safe">
        <div className="flex justify-around items-center px-2 py-3">
          
          <NavItem 
            icon={<Users size={24} />} 
            label="Friends" 
            isActive={false} 
            onClick={() => navigate('/friends')} 
          />
          
          <NavItem 
            icon={<UserPlus size={24} />} 
            label="Requests" 
            isActive={false} 
            onClick={() => navigate('/requests')} 
          />
          
          {/* --- CENTRAL MOOD BUTTON --- */}
          {/* Displays the user's current mood emoji if set, otherwise defaults to Smile icon */}
          <div className="relative -top-5">
            <button 
              onClick={() => navigate('/mood')} // Takes user to MoodDashboard to update it
              className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/40 border-4 border-[#120F22] active:scale-95 transition-transform"
            >
              {MoodIcon ? (
                <span className="text-3xl filter drop-shadow-md">{MoodIcon}</span>
              ) : (
                <Smile size={30} />
              )}
            </button>
            {/* Tiny label below the floating button */}
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 font-medium whitespace-nowrap">
              My Mood
            </span>
          </div>

          <NavItem 
            icon={<MessageCircle size={24} />} 
            label="Chats" 
            isActive={true} 
            onClick={() => navigate('/')} 
          />
          
          <NavItem 
            icon={<Star size={24} />} 
            label="Premium" 
            isActive={false} 
            onClick={() => alert('Connect')} 
          />
          
        </div>
      </nav>

    </div>
  );
}

// Helper Component for Bottom Nav Items
const NavItem = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-16 gap-1 transition-colors duration-200 ${isActive ? 'text-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}
  >
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);