// server.js (Node.js/Express Backend)

// Import necessary modules
const express = require("express");
const cors = require("cors");

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for demo (replace with database in production)
let contactMessages = [];
let messageId = 1;

// Portfolio data
const portfolioData = {
  projects: [
    {
      id: 1,
      title: "Project 1",
      description: "A brief description of your first project",
      technologies: ["JavaScript", "HTML", "CSS"],
      link: "#",
    },
    {
      id: 2,
      title: "Project 2",
      description: "A brief description of your second project",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "#",
    },
  ],
  skills: [
    { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React"] },
    { category: "Backend", items: ["Node.js", "Express", "MongoDB"] },
    { category: "Tools", items: ["Git", "VS Code", "Postman"] },
  ],
  about: {
    name: "Your Name",
    title: "Full Stack Developer",
    bio: "Welcome to my portfolio! I'm passionate about creating web applications.",
    email: "your.email@example.com",
  },
};

// ----------------------------------------------------
// 1. Middleware Setup
// ----------------------------------------------------

// Enable CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

// Middleware to parse incoming JSON requests
app.use(express.json());

// ----------------------------------------------------
// 2. Health Check Endpoint
// ----------------------------------------------------

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running!",
    version: "1.0.0",
  });
});

// ----------------------------------------------------
// 3. Contact Form Endpoints
// ----------------------------------------------------

// POST: Submit a new contact message
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields (Name, Email, Message) are required.",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  // Store the message
  const newMessage = {
    id: messageId++,
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  };
  contactMessages.push(newMessage);

  console.log("--- SUCCESSFULLY RECEIVED CONTACT MESSAGE ---");
  console.log(`From: ${name} <${email}>`);
  console.log(`Message: ${message}`);
  console.log("---------------------------------------------");

  res.status(201).json({
    success: true,
    message: "Thank you! Your message has been received successfully.",
    data: newMessage,
  });
});

// GET: Retrieve all contact messages (for admin/portfolio owner)
app.get("/api/contact", (req, res) => {
  res.status(200).json({
    success: true,
    count: contactMessages.length,
    data: contactMessages,
  });
});

// GET: Retrieve a specific contact message by ID
app.get("/api/contact/:id", (req, res) => {
  const { id } = req.params;
  const message = contactMessages.find((msg) => msg.id === parseInt(id));

  if (!message) {
    return res.status(404).json({
      success: false,
      message: "Contact message not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: message,
  });
});

// DELETE: Remove a contact message
app.delete("/api/contact/:id", (req, res) => {
  const { id } = req.params;
  const index = contactMessages.findIndex((msg) => msg.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Contact message not found.",
    });
  }

  const deletedMessage = contactMessages.splice(index, 1);
  res.status(200).json({
    success: true,
    message: "Message deleted successfully.",
    data: deletedMessage[0],
  });
});

// PUT: Update a contact message (status, notes, etc.)
app.put("/api/contact/:id", (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const message = contactMessages.find((msg) => msg.id === parseInt(id));

  if (!message) {
    return res.status(404).json({
      success: false,
      message: "Contact message not found.",
    });
  }

  if (status) message.status = status;
  if (notes) message.notes = notes;
  message.updatedAt = new Date().toISOString();

  res.status(200).json({
    success: true,
    message: "Message updated successfully.",
    data: message,
  });
});

// ----------------------------------------------------
// 4. Portfolio Information Endpoints
// ----------------------------------------------------

// GET: Portfolio about information
app.get("/api/about", (req, res) => {
  res.status(200).json({
    success: true,
    data: portfolioData.about,
  });
});

// GET: All projects
app.get("/api/projects", (req, res) => {
  res.status(200).json({
    success: true,
    count: portfolioData.projects.length,
    data: portfolioData.projects,
  });
});

// GET: Specific project by ID
app.get("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = portfolioData.projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

// GET: All skills
app.get("/api/skills", (req, res) => {
  res.status(200).json({
    success: true,
    data: portfolioData.skills,
  });
});

// GET: Skills by category
app.get("/api/skills/:category", (req, res) => {
  const { category } = req.params;
  const skillCategory = portfolioData.skills.find(
    (s) => s.category.toLowerCase() === category.toLowerCase(),
  );

  if (!skillCategory) {
    return res.status(404).json({
      success: false,
      message: "Skill category not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: skillCategory,
  });
});

// ----------------------------------------------------
// 5. Error Handling
// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred.",
    error: process.env.NODE_ENV === "production" ? undefined : err.message,
  });
});

// ----------------------------------------------------
// 6. Server Initialization
// ----------------------------------------------------

app.listen(PORT, () => {
  console.log(`✨ Server is running on http://localhost:${PORT}`);
  console.log("📚 API Documentation:");
  console.log("  GET  /                    - Health check");
  console.log("  POST /api/contact          - Submit contact form");
  console.log("  GET  /api/contact          - Get all messages");
  console.log("  GET  /api/contact/:id      - Get specific message");
  console.log("  PUT  /api/contact/:id      - Update message");
  console.log("  DELETE /api/contact/:id    - Delete message");
  console.log("  GET  /api/about            - Get about info");
  console.log("  GET  /api/projects         - Get all projects");
  console.log("  GET  /api/projects/:id     - Get specific project");
  console.log("  GET  /api/skills           - Get all skills");
  console.log("  GET  /api/skills/:category - Get skills by category");
});

module.exports = app;
