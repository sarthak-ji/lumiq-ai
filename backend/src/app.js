import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware..
app.use(express.json()); // read JSON data coming from the client.
app.use(express.urlencoded({extended: true})); // handles: form data sent through HTML forms.
app.use(cookieParser());

// Routes..
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Lumiq AI API' });
});

export default app;
