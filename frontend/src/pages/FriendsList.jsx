import React, { useState, useEffect } from 'react';

// --- Placeholder Icon Components (Defined outside the main function) ---
const MessageCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
);
const SearchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

// --- Helper to Map 'feeling' to a color for the UI ---
const getMoodStyle = (mood) => {
  switch (mood) {
    case 'happy':
    case 'excited':
      return 'text-yellow-400';
    case 'calm':
    case 'content':
      return 'text-green-400';
    case 'sad':
    case 'anxious':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

// --- Single Item Component ---
const FriendListItem = ({ friend }) => {
  // If the 'feeling' field is missing or null, default to 'neutral'
  const moodStyle = getMoodStyle(friend.feeling || 'neutral'); 

  return (
    <div className="flex items-center justify-between p-3.5 border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
      <div className="flex items-center space-x-4">
        <img
          className="w-12 h-12 rounded-full object-cover bg-gray-700"
          src={friend.avatar || "placeholder-url"} // Use a placeholder if avatar is missing
          alt={friend.username}
        />
        <div>
          <p className="text-white text-lg font-semibold">{friend.username}</p>
          <p className={`text-sm capitalize ${moodStyle}`}>
            {friend.feeling || 'neutral'}
          </p>
        </div>
      </div>
      <div className="p-2 rounded-full text-white/70 hover:text-sky-400 transition-colors cursor-pointer">
        <MessageCircle className="w-6 h-6" />
      </div>
    </div>
  );
};


// --- Main Friends List Component ---
export default function FriendsList() {
  // --- STATE FOR LIVE DATA ---
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- FETCHING LOGIC ---
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // NOTE: Replace 'http://localhost:7000' with your actual server address if different
        const response = await fetch('http://localhost:7000/api/v1/user/friends', { 
          method: 'GET',
          // CRUCIAL: Sends the HTTP cookie (JWT) for authentication
          credentials: 'include', 
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch friends: ${response.statusText}`);
        }

        const json = await response.json();
        
        // Assuming the response is { status: 'success', data: { friends: [...] } }
        setFriends(json.data.friends); 

      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriends();
  }, []); // Empty dependency array means this runs only ONCE when the component loads

  
  // --- RENDERING UI ---
  return (
    <div
      className="min-h-screen w-full flex flex-col relative overflow-hidden
                 bg-[#120F22]
                 bg-gradient-to-br from-[#120F22] via-[#120F22] to-[#120F22]
                 bg-[length:200%_200%]
                 animate-[bg-shift_20s_ease_infinite]
                 "
      style={{
        animationName: 'bg-shift',
        '@keyframes bg-shift': {
          '0%': { backgroundPosition: '0% 0%' },
          '25%': { backgroundPosition: '50% 50%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '50% 50%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
      }}
    >
      
      {/* 1. LIGHT SPOT ANIMATION */}
      <div
        className="absolute inset-0 z-0 opacity-20 bg-gradient-radial from-blue-400 via-transparent to-transparent bg-[length:1000px_1000px] animate-[spot-move_15s_ease-in-out_infinite]"
        style={{
          animationName: 'spot-move',
          '@keyframes spot-move': {
            '0%': { backgroundPosition: 'center 0%' },
            '25%': { backgroundPosition: '80% 20%' },
            '50%': { backgroundPosition: '20% 80%' },
            '75%': { backgroundPosition: '80% 80%' },
            '100%': { backgroundPosition: 'center 0%' },
          },
        }}
      ></div>

      {/* 2. HEADER AND SEARCH BAR CONTAINER */}
      <header className="sticky top-0 z-20 p-5 bg-[#120F22]/90 backdrop-blur-sm shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-4">Friends</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for friends..."
            className="w-full p-3 pl-10 rounded-lg bg-white/10 text-white placeholder-white/50 border border-transparent focus:border-sky-500 focus:ring-sky-500 transition"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
        </div>
      </header>
      
      {/* 3. SCROLLABLE FRIENDS LIST & LOADING/ERROR STATES */}
      <main className="flex-1 overflow-y-auto z-10 p-2">
        {isLoading && (
          <p className="text-white/60 text-center mt-8">Loading friends...</p>
        )}
        {error && (
          <p className="text-red-400 text-center mt-8">Error fetching data: {error}</p>
        )}
        
        {/* Render friends only if not loading and no error */}
        {!isLoading && !error && friends.map((friend) => (
          <FriendListItem key={friend._id || friend.id} friend={friend} />
        ))}
        
        {/* Show message if the list is empty */}
        {!isLoading && !error && friends.length === 0 && (
          <p className="text-white/40 text-center mt-8">You have no friends yet. Try searching!</p>
        )}
      </main>
      
    </div>
  );
}