import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 3000;
import connectToDatabase from "./config/server.js";
import registeredRouters from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://eduzone-jscm.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.set("json spaces", 2);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is up and running!",
    data: "Hello World!",
    timestamp: new Date().toISOString(),
    documentation: "https://www.link.com",
  });
});

//-////////////////////////////////
// API ROUTES FROM ROUTES/INDEX.js|
//-////////////////////////////////
registeredRouters(app);

// Start server
connectToDatabase(process.env.DB_CONFIGURATION);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
