import "./src/config/env.js";

import app from './src/app.js';
import connectDB from './src/config/database.js';


const PORT = process.env.PORT || 8000;

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
