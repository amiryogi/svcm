import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Route files
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import admissionRoutes from './routes/admissionRoutes.js';
import pageRoutes from './routes/pageRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// Set security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SVCM Campus API is running',
    timestamp: new Date().toISOString(),
  });
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/media', mediaRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}
📡 API: http://localhost:${PORT}/api
🏥 Health: http://localhost:${PORT}/api/health
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
