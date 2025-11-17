import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import MoodSelect from "./pages/MoodDashboard";
import FriendsList from "./pages/FriendsList";
import FriendRequests from "./pages/FriendRequest";
import Chat from "./pages/Chat";
import MoodDashboard from "./pages/MoodDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mood" element={<MoodSelect />} />
        <Route path="/friends" element={<FriendsList />} />
        <Route path="/requests" element={<FriendRequests />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/dashboard" element={<MoodDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
