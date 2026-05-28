import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ limit: '16kb', extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Lumiq AI API' });
});

export default app;
