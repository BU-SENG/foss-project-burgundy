import React, { useState, useEffect } from 'react';
import { GetFriends } from '../services/friendService';

// --- Placeholder Icons ---
const MessageCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
  </svg>
);
const SearchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

// --- Mood color mapping ---
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

// --- Generate initials from username ---
const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

// --- Single Friend Item ---
const FriendListItem = ({ friend }) => {
  const moodStyle = getMoodStyle(friend.feeling || 'neutral');
  const initials = getInitials(friend.username);

  return (
    <div className="flex items-center justify-between p-3.5 border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold text-lg">
          {initials}
        </div>
        <div>
          <p className="text-white text-lg font-semibold">{friend.username}</p>
          <p className={`text-sm capitalize ${moodStyle}`}>{friend.feeling || 'neutral'}</p>
        </div>
      </div>
      <div className="p-2 rounded-full text-white/70 hover:text-sky-400 transition-colors cursor-pointer">
        <MessageCircle className="w-6 h-6" />
      </div>
    </div>
  );
};

// --- Main Component ---
export default function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetFriends();
        setFriends(res.data.friends || []);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to fetch friends');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredFriends = friends.filter(f =>
    f.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-[#120F22] text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 p-5 bg-[#120F22]/90 backdrop-blur-sm shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Friends</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for friends..."
            className="w-full p-3 pl-10 rounded-lg bg-white/10 text-white placeholder-white/50 border border-transparent focus:border-sky-500 focus:ring-sky-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
        </div>
      </header>

      {/* Friends List */}
      <main className="flex-1 overflow-y-auto z-10 p-2">
        {isLoading && <p className="text-white/60 text-center mt-8">Loading friends...</p>}
        {error && <p className="text-red-400 text-center mt-8">{error}</p>}
        {!isLoading && !error && filteredFriends.length === 0 && (
          <p className="text-white/40 text-center mt-8">No friends found.</p>
        )}
        {!isLoading && !error && filteredFriends.map(friend => (
          <FriendListItem key={friend._id} friend={friend} />
        ))}
      </main>
    </div>
  );
}