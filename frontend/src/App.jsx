import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import MoodSelect from "./pages/MoodSelect";
import FriendsList from "./pages/FriendsList";
import FriendRequests from "./pages/FriendRequest";
import Home from "./pages/Home";
import MoodDashboard from "./pages/MoodDashboard";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mood" element={<MoodSelect />} />
        <Route path="/friends" element={<FriendsList />} />
        <Route path="/requests" element={<FriendRequests />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<MoodDashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
