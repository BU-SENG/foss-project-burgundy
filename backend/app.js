const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectToMongo } = require('./config/config');
const AppError = require('./error/appError');
const globalErrorHandler = require('./controllers/errorController');
const catchAsync = require('./error/catchAsync');

const { analyzeMessage, saveChat } = require('./controllers/chatController');

// Import routes
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ['*']},
});

// Connect to DB
connectToMongo();

// Middleware
app.use(cors({ origin: ['*'], methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/chat', chatRoute);

// Health check
app.get('/', (req, res) => res.send('Moodly backend is live 🚀'));

// --- SOCKET.IO REAL-TIME CHAT ---
io.on('connection', (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  socket.on('send_message', async ({ sender, receiver, message, roomType = 'direct' }) => {
    try {
      // Analyze emotion using controller
      const { emotion, score } = await analyzeMessage(message);

      // Save message to DB
      const saved = await saveChat({ sender, receiver, message, emotion, score, roomType });

      // Emit message to sender
      socket.emit('message_sent', saved);

      // Emit to receiver if available
      if (receiver) socket.to(receiver).emit('receive_message', saved);

      // Optionally, redirect to mood rooms
      if (emotion === 'joy' || emotion === 'love') socket.emit('redirect_to_happy_room', saved);
      else if (['sadness', 'fear', 'anger'].includes(emotion)) socket.emit('redirect_to_support_room', saved);
      else socket.emit('emotion_result', saved);

    } catch (err) {
      console.error('Socket.IO send_message error:', err);
      socket.emit('emotion_error', { error: 'Failed to analyze or save message' });
    }
  });

  socket.on('disconnect', () => console.log(`🔴 User disconnected: ${socket.id}`));
});

// Fallback for undefined routes
app.use(catchAsync(async (req, res, next) => {
  throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
}));

// Global error handler
app.use(globalErrorHandler);

// Start server
const PORT = process.env.PORT || 7000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));