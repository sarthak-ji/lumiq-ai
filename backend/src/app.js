import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';

const app = express();

// Middleware..
app.use(express.json()); // read JSON data coming from the client.
app.use(express.urlencoded({extended: true})); // handles: form data sent through HTML forms.
app.use(cookieParser());

// Routes..
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Lumiq AI API' });
});


app.use("/api/auth", authRouter);

export default app; 