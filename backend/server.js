import "./src/config/env.js";

import http from "http";
import app from './src/app.js';
import connectDB from './src/config/database.js';
import {initSocket} from './src/sockets/server.socket.js';


const PORT = process.env.PORT || 8000;


const httpServer = http.createServer(app);

initSocket(httpServer);

// Connect to database
connectDB();

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
