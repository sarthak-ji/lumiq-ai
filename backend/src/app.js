import express from "express"; // Import Express to create and configure the server
import authRouter from "./routes/auth.route.js";
import chatRouter from "./routes/chat.route.js";
import cookieParser from "cookie-parser"; // Import middleware to read cookies from incoming requests
import morgan from "morgan"; // Import Morgan to log incoming HTTP requests
import cors from "cors"; // Import CORS middleware to allow requests from another origin


const app = express(); // Create an Express application instance

app.use(express.json()); // Parse incoming JSON request bodies

app.use(express.urlencoded({ extended: true })); // Parse data sent through HTML forms

app.use(cookieParser()); // Parse cookies attached to incoming requests

app.use(morgan("dev")); // Log HTTP requests in the terminal


// Configure CORS to control which frontend can access this backend
app.use(cors({
    
    origin: "http://localhost:5173", // Allow requests from the React frontend running on port 5173
    credentials: true, // Allow cookies to be sent with cross-origin requests

    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods from the frontend
}));


// Create a basic health-check route
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

// Use authentication routes under the /api/auth URL
app.use("/api/auth", authRouter);

// Use chat routes under the /api/chats URL
app.use("/api/chats", chatRouter);



export default app;




// Frontend
//    │
//    │ HTTP Request
//    ▼
// Express App
//    │
//    ├── express.json()
//    ├── cookieParser()
//    ├── morgan()
//    ├── cors()
//    │
//    ▼
// Check URL
//    │
//    ├── /api/auth  ──→ authRouter
//    │
//    ├── /api/chats ──→ chatRouter
//    │
//    └── /          ──→ Health Check