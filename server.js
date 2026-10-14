const crypto = require("crypto");
globalThis.crypto = crypto;

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const studentRoutes = require("./routes/studentRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Serve the public folder
app.use(express.static(path.join(__dirname, "public")));

// Student routes
app.use("/api/students", studentRoutes);

// Port
const PORT = process.env.PORT || 3000;

// Connect to MongoDB first, then start the server
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
            console.log(
                `Open your browser and go to: http://localhost:${PORT}`
            );
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });