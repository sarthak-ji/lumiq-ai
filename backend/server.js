import "./src/config/env.js";
import http from "http";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";

// Import the function used to initialize Socket.IO
import { initSocket } from "./src/sockets/server.socket.js";

const PORT = process.env.PORT || 8000; // Use the PORT from environment variables, or 8000 if not provided

const httpServer = http.createServer(app); // Create an HTTP server using the Express app


initSocket(httpServer); // Attach Socket.IO to the HTTP server


connectDB(); // Connect the application to the database

// Start the HTTP server and listen for incoming requests
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// FLOW :-
// Load environment variables
//         ↓
// Load Express app
//         ↓
// Create HTTP server
//         ↓
// Initialize Socket.IO
//         ↓
// Connect to Database
//         ↓
// Start listening on PORT