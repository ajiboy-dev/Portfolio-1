# Complete Testing, Deployment & Git Guide

## 📋 Table of Contents

1. [Test Endpoints Locally](#test-locally)
2. [Test with Postman](#test-postman)
3. [Test with MongoDB Compass](#test-mongodb)
4. [Deploy to Vercel](#deploy-vercel)
5. [Commit to GitHub](#github)

---

# Test Endpoints Locally {#test-locally}

## Step 1: Install Dependencies

```bash
# Navigate to portfolio folder
cd "C:\Users\USER\Documents\JAN WEB  BATCH 2025\PROJECTS\portfolio"

# Install all required packages
npm install
```

You should see:

```
added X packages
```

## Step 2: Start the Development Server

```bash
# Start with auto-reload (recommended)
npm run dev
```

OR

```bash
# Start without auto-reload
npm start
```

### Expected Output:

```
✨ Server is running on http://localhost:3000
📚 API Documentation:
  GET  /                    - Health check
  POST /api/contact          - Submit contact form
  GET  /api/contact          - Get all messages
  ...
```

✅ **Server is now running on** `http://localhost:3000`

## Step 3: Test Using Command Line (cURL)

Open a **NEW terminal** (keep the server running in the first one):

### Test 1: Health Check

```bash
curl http://localhost:3000/
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Portfolio API is running!",
  "version": "1.0.0"
}
```

### Test 2: Submit Contact Form

```bash
curl -X POST http://localhost:3000/api/contact `
  -H "Content-Type: application/json" `
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"message\":\"Hello!\"}"
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Thank you! Your message has been received successfully.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!",
    "timestamp": "2026-06-08T12:00:00.000Z"
  }
}
```

### Test 3: Get All Contacts

```bash
curl http://localhost:3000/api/contact
```

### Test 4: Get Projects

```bash
curl http://localhost:3000/api/projects
```

### Test 5: Get Skills

```bash
curl http://localhost:3000/api/skills
```

### Test 6: Get Skills by Category

```bash
curl http://localhost:3000/api/skills/Frontend
```

---

# Test with Postman {#test-postman}

## Step 1: Download Postman

1. Visit https://www.postman.com/downloads/
2. Download for Windows
3. Install and open Postman
4. Create a free account (or skip)

## Step 2: Create a Collection

1. Click **Collections** (left sidebar)
2. Click **+ Create Collection**
3. Name it: `Portfolio API`
4. Click **Create**

## Step 3: Create Requests

### Create Request 1: Health Check

1. In the collection, click **Add Request**
2. Name: `Health Check`
3. Set method to **GET**
4. URL: `http://localhost:3000/`
5. Click **Send**

**Expected Response:**

```json
{
  "success": true,
  "message": "Portfolio API is running!",
  "version": "1.0.0"
}
```

### Create Request 2: Submit Contact

1. Click **Add Request**
2. Name: `Submit Contact`
3. Set method to **POST**
4. URL: `http://localhost:3000/api/contact`
5. Go to **Body** tab
6. Select **raw** and **JSON**
7. Paste this JSON:

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "I'm interested in your services"
}
```

8. Click **Send**

**Expected Response:**

```json
{
  "success": true,
  "message": "Thank you! Your message has been received successfully.",
  "data": {
    "id": 1,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "I'm interested in your services",
    "timestamp": "2026-06-08T12:05:00.000Z"
  }
}
```

### Create Request 3: Get All Contacts

1. Click **Add Request**
2. Name: `Get All Contacts`
3. Set method to **GET**
4. URL: `http://localhost:3000/api/contact`
5. Click **Send**

### Create Request 4: Get Specific Contact

1. Click **Add Request**
2. Name: `Get Contact by ID`
3. Set method to **GET**
4. URL: `http://localhost:3000/api/contact/1`
5. Click **Send**

### Create Request 5: Update Contact

1. Click **Add Request**
2. Name: `Update Contact`
3. Set method to **PUT**
4. URL: `http://localhost:3000/api/contact/1`
5. Go to **Body** → **raw** → **JSON**
6. Paste:

```json
{
  "status": "read",
  "notes": "Follow up next week"
}
```

7. Click **Send**

### Create Request 6: Delete Contact

1. Click **Add Request**
2. Name: `Delete Contact`
3. Set method to **DELETE**
4. URL: `http://localhost:3000/api/contact/1`
5. Click **Send**

**Expected Response:**

```json
{
  "success": true,
  "message": "Message deleted successfully.",
  "data": {
    "id": 1,
    "name": "Jane Smith",
    ...
  }
}
```

### Create Request 7: Get All Projects

1. Click **Add Request**
2. Name: `Get Projects`
3. Set method to **GET**
4. URL: `http://localhost:3000/api/projects`
5. Click **Send**

### Create Request 8: Get Skills

1. Click **Add Request**
2. Name: `Get Skills`
3. Set method to **GET**
4. URL: `http://localhost:3000/api/skills`
5. Click **Send**

## Step 4: Save Collection

1. Click **Save** to save all requests
2. Use **Ctrl+S** to save after each change

## Step 5: Test All Requests

1. Select requests one by one
2. Click **Send** on each
3. Verify responses match expected format
4. Note any errors in the response panel

---

# Test with MongoDB Compass {#test-mongodb}

**Note:** Your current backend uses in-memory storage. To use MongoDB Compass:

## Step 1: Download MongoDB Compass

1. Visit https://www.mongodb.com/products/compass
2. Download for Windows
3. Install and open Compass

## Step 2: Connect to Local MongoDB

1. Make sure MongoDB is running (Windows Service)
2. In Compass, click **Connect**
3. Connection string: `mongodb://localhost:27017`
4. Click **Connect**

## Step 3: Update server.js to Use MongoDB (Optional)

To actually store data in MongoDB instead of memory, you would:

1. Install MongoDB package:

```bash
npm install mongoose
```

2. Update `server.js` to use MongoDB:

```javascript
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/portfolio")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("DB Error:", err));

// Define schema
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// Update POST endpoint to save to DB
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // ... validation code ...

  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been received.",
      data: newMessage,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
```

3. **For now**, your API uses in-memory storage which resets on server restart
4. This is fine for testing and demo purposes

---

# Deploy to Vercel {#deploy-vercel}

## Step 1: Prepare Your GitHub Repository

### 1.1: Initialize Git

```bash
# Navigate to portfolio folder
cd "C:\Users\USER\Documents\JAN WEB  BATCH 2025\PROJECTS\portfolio"

# Initialize git
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: Add portfolio with API endpoints"
```

### 1.2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `portfolio` (or any name you like)
3. Description: `Full-stack portfolio with Express API`
4. Choose **Public** or **Private**
5. Do NOT initialize with README (you already have one)
6. Click **Create repository**

### 1.3: Push to GitHub

```bash
# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/portfolio.git

# Change branch name to main
git branch -M main

# Push code to GitHub
git push -u origin main
```

**Expected Output:**

```
Enumerating objects: ...
Counting objects: ...
Writing objects: ...
...
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ Your code is now on GitHub!

## Step 2: Deploy on Vercel

### 2.1: Connect Vercel to GitHub

1. Go to https://vercel.com
2. Click **Sign Up** (or **Login** if you have account)
3. Click **Continue with GitHub**
4. Authorize Vercel to access your GitHub account

### 2.2: Import Project

1. After authorization, you'll see **Import Project**
2. Click **Import Git Repository**
3. Paste your repository URL: `https://github.com/USERNAME/portfolio`
4. Click **Continue**

### 2.3: Configure Project

1. **Project Name**: `portfolio` (auto-filled)
2. **Framework Preset**: Select **Other** → **Node.js**
3. **Root Directory**: Keep empty (or select `portfolio` if in monorepo)
4. **Build Command**: Leave empty (default)
5. **Output Directory**: Leave empty
6. Click **Deploy**

### 2.4: Wait for Deployment

You'll see:

```
Building...
✓ Built successfully
✓ Deployed to https://portfolio-xyz.vercel.app
```

✅ Your site is now live!

## Step 3: Test Deployed Site

```bash
# Replace xyz with your actual Vercel domain
curl https://portfolio-xyz.vercel.app/

# Test API endpoint
curl -X POST https://portfolio-xyz.vercel.app/api/contact `
  -H "Content-Type: application/json" `
  -d "{\"name\":\"Test\",\"email\":\"test@example.com\",\"message\":\"Hello\"}"
```

## Step 4: Get Your Vercel URL

Your live URL will be displayed on Vercel dashboard:

```
https://portfolio-[random-string].vercel.app
```

You can:

- Share this link with anyone
- Add a custom domain (in Vercel settings)
- Update with `git push` (auto-deploys)

---

# Commit to GitHub {#github}

## Common Git Tasks

### Task 1: Make Changes and Commit

```bash
# Navigate to portfolio folder
cd "C:\Users\USER\Documents\JAN WEB  BATCH 2025\PROJECTS\portfolio"

# Check what files changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "Update: Add new endpoint documentation"

# Push to GitHub
git push
```

### Task 2: Useful Git Commits

```bash
# Add new feature
git commit -m "feat: Add email validation to contact form"

# Fix a bug
git commit -m "fix: Correct API response format"

# Update documentation
git commit -m "docs: Update API documentation"

# Update dependencies
git commit -m "chore: Update Express to v5.1.0"
```

### Task 3: Check Git Log

```bash
# View commit history
git log --oneline

# See last 5 commits
git log -5 --oneline
```

**Output:**

```
abc1234 Update: Add new endpoint documentation
def5678 feat: Add email validation
ghi9012 Initial commit
```

### Task 4: Undo Changes

```bash
# See what changed
git diff

# Undo unstaged changes to a file
git checkout -- server.js

# Undo all unstaged changes
git checkout -- .

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

---

## 📊 Complete Workflow Summary

### Local Development

```
1. npm install
2. npm run dev
3. Test with cURL/Postman
4. Make changes
```

### Commit to GitHub

```
1. git add .
2. git commit -m "Your message"
3. git push
```

### Deploy to Vercel

```
1. Push to GitHub (git push)
2. Vercel auto-deploys
3. Check live URL
```

### Test Live Site

```
1. Use same cURL/Postman commands
2. Replace http://localhost:3000 with https://your-vercel-url.app
```

---

## 🆘 Quick Troubleshooting

| Problem                    | Solution                                |
| -------------------------- | --------------------------------------- |
| `Port 3000 already in use` | Kill the process or change PORT in .env |
| `npm: command not found`   | Reinstall Node.js from nodejs.org       |
| `git: command not found`   | Reinstall Git from git-scm.com          |
| `Vercel deployment fails`  | Check build logs in Vercel dashboard    |
| `Push rejected`            | Run `git pull` before `git push`        |
| `API returns 404`          | Check URL spelling and HTTP method      |
| `CORS error`               | CORS is already enabled in server.js    |

---

## 📚 Quick Reference Commands

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server (auto-reload)
npm start            # Start production server

# Git
git status           # Check changed files
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub
git pull             # Pull latest from GitHub
git log --oneline    # View commit history

# Testing
curl http://localhost:3000/                    # Health check
curl http://localhost:3000/api/projects        # Get projects
curl http://localhost:3000/api/skills          # Get skills
```

---

**You're all set! Start testing locally, then deploy when ready! 🚀**
