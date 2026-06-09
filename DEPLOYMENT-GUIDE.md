# Portfolio Deployment Guide

Choose between **Vercel** (recommended) or **Netlify** for deployment.

---

## 🚀 **Option 1: Deploy to Vercel (RECOMMENDED)**

Vercel is optimized for Node.js backends and provides better support for Express servers.

### Prerequisites:

- GitHub account
- Vercel account (free at https://vercel.com)
- Push your code to GitHub

### Step-by-Step Guide:

#### **1. Prepare Your Repository**

```bash
# Make sure you have a .gitignore file in the portfolio folder
# Add these lines if not already present:
# node_modules/
# .env.local
# .DS_Store
```

Create a `.env` file (for local development):

```
PORT=3000
NODE_ENV=development
```

#### **2. Create `vercel.json` Configuration**

Create a `vercel.json` file in the portfolio root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "index.html",
      "use": "@vercel/static"
    },
    {
      "src": "style.css",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/(.*)",
      "dest": "index.html"
    }
  ]
}
```

#### **3. Push Code to GitHub**

```bash
cd c:\Users\USER\Documents\JAN WEB  BATCH 2025\PROJECTS\portfolio

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

#### **4. Deploy on Vercel**

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"** or **"New Project"**
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Select **Node.js**
   - **Root Directory**: `portfolio/`
5. Click **"Deploy"**
6. Wait for deployment to complete (typically 1-2 minutes)
7. Your site will be live at `https://YOUR_PROJECT.vercel.app`

#### **5. Configure Environment Variables (if needed)**

1. Go to **Project Settings** → **Environment Variables**
2. Add any sensitive data (API keys, etc.)
3. Redeploy the project

#### **6. Set Up Custom Domain (Optional)**

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Update your domain's DNS records as instructed

---

## 🌐 **Option 2: Deploy to Netlify**

Netlify is better suited for static sites but can handle Node.js backends using Netlify Functions.

### Prerequisites:

- GitHub account
- Netlify account (free at https://netlify.com)
- Code pushed to GitHub

### Step-by-Step Guide:

#### **1. Convert Backend to Netlify Functions**

Create a `netlify/functions/` directory structure:

```
portfolio/
├── netlify/
│   └── functions/
│       ├── contact.js
│       ├── projects.js
│       ├── skills.js
│       └── about.js
├── index.html
├── style.css
└── netlify.toml
```

#### **2. Create `netlify.toml` Configuration**

```toml
[build]
  command = "npm install"
  functions = "netlify/functions"
  publish = "."

[dev]
  command = "node server.js"
  port = 3000

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### **3. Convert server.js endpoints to functions**

Create `netlify/functions/contact.js`:

```javascript
// Serverless function for contact form
exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "All fields required",
        }),
      };
    }

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        message: "Thank you! Your message has been received.",
      }),
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method not allowed" }),
  };
};
```

Repeat for other endpoints...

#### **4. Push to GitHub**

```bash
git add .
git commit -m "Add Netlify Functions configuration"
git push
```

#### **5. Deploy on Netlify**

1. Go to https://app.netlify.com
2. Click **"New site from Git"**
3. Select your GitHub repository
4. Configure build settings:
   - **Build command**: Leave blank or `npm install`
   - **Publish directory**: Leave blank (root)
5. Click **"Deploy site"**
6. Your site will be live (Netlify generates a URL)

#### **6. Add Custom Domain**

1. Go to **Site settings** → **Domain management**
2. Add your custom domain
3. Follow DNS configuration instructions

---

## ⚙️ **Local Development**

### Run Locally:

```bash
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Or use regular start
npm start
```

Visit `http://localhost:3000` in your browser.

### Test API Endpoints:

```bash
# Test health check
curl http://localhost:3000/

# Test contact submission
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello"}'

# Get all contacts
curl http://localhost:3000/api/contact

# Get projects
curl http://localhost:3000/api/projects

# Get skills
curl http://localhost:3000/api/skills
```

---

## 📋 **Comparison: Vercel vs Netlify**

| Feature            | Vercel                       | Netlify                   |
| ------------------ | ---------------------------- | ------------------------- |
| **Best For**       | Node.js backends             | Static sites + Serverless |
| **Ease of Setup**  | ⭐⭐⭐⭐⭐                   | ⭐⭐⭐⭐                  |
| **Performance**    | Excellent                    | Good                      |
| **Serverless**     | Native Node.js               | Functions                 |
| **Cold Start**     | Fast                         | Slower                    |
| **Cost**           | Free tier available          | Free tier available       |
| **Recommendation** | ✅ **BEST for this project** | Alternative               |

---

## 🆘 **Troubleshooting**

### Vercel Issues:

- **API endpoint 404**: Check `vercel.json` routes configuration
- **Node modules not found**: Ensure `package.json` is in the root
- **Port already in use**: Vercel automatically handles PORT assignment

### Netlify Issues:

- **Functions not working**: Check `netlify.toml` functions path
- **CORS issues**: Add CORS headers in function response
- **Environment variables**: Set in Site settings → Build & deploy

---

## 📝 **Next Steps**

1. **Database**: Replace in-memory storage with MongoDB or Firebase
2. **Authentication**: Add user authentication for contact management
3. **Email Notifications**: Integrate SendGrid or Nodemailer
4. **Analytics**: Add Google Analytics or Vercel Analytics
5. **SSL Certificate**: Automatically handled by both platforms

---

**Happy Deploying! 🎉**
