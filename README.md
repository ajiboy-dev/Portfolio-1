# Portfolio Project

A modern portfolio website with a full-featured Node.js/Express backend API.

## 📁 Project Structure

```
portfolio/
├── server.js                # Express backend with 11+ API endpoints
├── package.json             # Dependencies
├── vercel.json              # Vercel deployment config
├── index.html               # Frontend
├── style.css                # Styling
├── README.md                # This file
├── API-DOCUMENTATION.md     # Full API reference
└── DEPLOYMENT-GUIDE.md      # Step-by-step deployment guide
```

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server runs on `http://localhost:3000`

## 📚 API Endpoints

### Health Check

- `GET /` - Server status

### Contact Management

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages
- `GET /api/contact/:id` - Get specific message
- `PUT /api/contact/:id` - Update message
- `DELETE /api/contact/:id` - Delete message

### Portfolio Information

- `GET /api/about` - Get about information
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `GET /api/skills` - Get all skills
- `GET /api/skills/:category` - Get skills by category

📖 **Full documentation**: See [API-DOCUMENTATION.md](API-DOCUMENTATION.md)

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push

# 2. Import in Vercel
# Visit https://vercel.com → Add New Project → Select repository

# 3. Deploy
# Vercel automatically uses vercel.json configuration
```

### Deploy to Netlify

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed Netlify instructions.

📖 **Full deployment guide**: See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

## 🧪 Test API Endpoints

### Using cURL

```bash
# Health check
curl http://localhost:3000/

# Submit contact
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello"}'

# Get contacts
curl http://localhost:3000/api/contact
```

### Using Postman

1. Open Postman
2. Create requests for each endpoint
3. Import the API documentation if available

## 🔧 Configuration

### Environment Variables (.env)

```
PORT=3000
NODE_ENV=development
```

### Vercel Configuration

- `vercel.json` - Contains build and route configuration
- Auto-deployed from GitHub push

## 📝 Next Steps

1. **Update Portfolio Data** - Edit portfolio data in `server.js` (lines 15-40)
2. **Add Database** - Replace in-memory storage with MongoDB/Firebase
3. **Email Integration** - Add SendGrid or Nodemailer for notifications
4. **Authentication** - Secure admin endpoints
5. **Custom Domain** - Add domain in Vercel settings

## 🆘 Troubleshooting

| Issue                     | Solution                                                |
| ------------------------- | ------------------------------------------------------- |
| Port already in use       | Change PORT in .env or stop other services              |
| API endpoints not working | Check server console for errors                         |
| CORS errors               | Verify CORS configuration in server.js                  |
| Deployment fails          | Check vercel.json and ensure Node version compatibility |

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md#troubleshooting) for more details.

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com/)
- [Node.js Documentation](https://nodejs.org/docs/)

## 📄 License

Feel free to modify and use this project for your own portfolio.
