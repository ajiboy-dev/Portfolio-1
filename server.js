// server.js (Node.js/Express Backend)

// Import necessary modules
// We use 'cors' to handle security issues when the frontend is on one port and the backend is on another.
const express = require("express");
const cors = require("cors");

// Initialize the Express application
const app = express();
const PORT = 3000; // The port your backend will run on. Frontend expects the server to be running here or routed correctly.

// ----------------------------------------------------
// 1. Middleware Setup
// ----------------------------------------------------

// Enable CORS (Cross-Origin Resource Sharing) for development
// Allows any origin (*) to access the API. In production, you would set this to your specific domain.
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware to parse incoming JSON requests

app.use(express.json());

// ----------------------------------------------------
// 2. Define the Contact Form Endpoint: POST /api/contact
// ----------------------------------------------------

app.post("/api/contact", (req, res) => {
  // Destructure the data sent from the index.html form
  const { name, email, message } = req.body;

  // Basic Input Validation
  if (!name || !email || !message) {
    // Send a 400 Bad Request response if required fields are missing
    return res.status(400).json({
      success: false,
      message: "All fields (Name, Email, Message) are required.",
    });
  }

  // --- Core Logic: Process the message ---

  // NOTE: In a real-world application, this is where you would call an email service
  // (like Nodemailer, SendGrid, or a database service) to handle the message.

  console.log("--- SUCCESSFULLY RECEIVED CONTACT MESSAGE ---");
  console.log(`From: ${name} <${email}>`);
  console.log(`Message: ${message}`);
  console.log("---------------------------------------------");

  // Send a 200 OK response back to the frontend
  // The frontend script will display the success message based on this response.
  res.status(200).json({
    success: true,
    message: "Thank you! Your message has been received successfully.",
  });
});

// If the user tries to access any other route, send a 404
app.use((req, res) => {
  res.status(404).send("API endpoint not found.");
});

// ----------------------------------------------------
// 3. Server Initialization
// ----------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server is running! Navigate to http://localhost:${PORT}`);
  console.log("Ready to receive POST requests at /api/contact");
});
