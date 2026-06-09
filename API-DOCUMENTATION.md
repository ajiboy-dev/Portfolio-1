# API Endpoints Documentation

## Base URL

- **Local**: `http://localhost:3000`
- **Production**: `https://your-portfolio-domain.com`

---

## Endpoints

### 1. **Health Check**

```
GET /
```

**Response:**

```json
{
  "success": true,
  "message": "Portfolio API is running!",
  "version": "1.0.0"
}
```

---

### 2. **Contact Form - Submit Message**

```
POST /api/contact
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'd like to work with you!"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Thank you! Your message has been received successfully.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I'd like to work with you!",
    "timestamp": "2026-06-08T10:30:00.000Z"
  }
}
```

---

### 3. **Contact Form - Get All Messages**

```
GET /api/contact
```

**Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "message": "I'd like to work with you!",
      "timestamp": "2026-06-08T10:30:00.000Z"
    }
  ]
}
```

---

### 4. **Contact Form - Get Specific Message**

```
GET /api/contact/:id
```

**Example:** `GET /api/contact/1`

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I'd like to work with you!",
    "timestamp": "2026-06-08T10:30:00.000Z"
  }
}
```

---

### 5. **Contact Form - Update Message**

```
PUT /api/contact/:id
```

**Example:** `PUT /api/contact/1`

**Request Body:**

```json
{
  "status": "read",
  "notes": "Follow up next week"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Message updated successfully.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I'd like to work with you!",
    "timestamp": "2026-06-08T10:30:00.000Z",
    "status": "read",
    "notes": "Follow up next week",
    "updatedAt": "2026-06-08T10:35:00.000Z"
  }
}
```

---

### 6. **Contact Form - Delete Message**

```
DELETE /api/contact/:id
```

**Example:** `DELETE /api/contact/1`

**Response:**

```json
{
  "success": true,
  "message": "Message deleted successfully.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I'd like to work with you!",
    "timestamp": "2026-06-08T10:30:00.000Z"
  }
}
```

---

### 7. **Get About Information**

```
GET /api/about
```

**Response:**

```json
{
  "success": true,
  "data": {
    "name": "Your Name",
    "title": "Full Stack Developer",
    "bio": "Welcome to my portfolio! I'm passionate about creating web applications.",
    "email": "your.email@example.com"
  }
}
```

---

### 8. **Get All Projects**

```
GET /api/projects
```

**Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Project 1",
      "description": "A brief description of your first project",
      "technologies": ["JavaScript", "HTML", "CSS"],
      "link": "#"
    },
    {
      "id": 2,
      "title": "Project 2",
      "description": "A brief description of your second project",
      "technologies": ["React", "Node.js", "MongoDB"],
      "link": "#"
    }
  ]
}
```

---

### 9. **Get Specific Project**

```
GET /api/projects/:id
```

**Example:** `GET /api/projects/1`

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Project 1",
    "description": "A brief description of your first project",
    "technologies": ["JavaScript", "HTML", "CSS"],
    "link": "#"
  }
}
```

---

### 10. **Get All Skills**

```
GET /api/skills
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "category": "Frontend",
      "items": ["HTML", "CSS", "JavaScript", "React"]
    },
    {
      "category": "Backend",
      "items": ["Node.js", "Express", "MongoDB"]
    },
    {
      "category": "Tools",
      "items": ["Git", "VS Code", "Postman"]
    }
  ]
}
```

---

### 11. **Get Skills by Category**

```
GET /api/skills/:category
```

**Example:** `GET /api/skills/Frontend`

**Response:**

```json
{
  "success": true,
  "data": {
    "category": "Frontend",
    "items": ["HTML", "CSS", "JavaScript", "React"]
  }
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "All fields (Name, Email, Message) are required."
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Contact message not found."
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "An internal server error occurred."
}
```

---

## Testing with cURL

```bash
# Health check
curl http://localhost:3000/

# Submit contact
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello"}'

# Get all contacts
curl http://localhost:3000/api/contact

# Get specific contact
curl http://localhost:3000/api/contact/1

# Update contact
curl -X PUT http://localhost:3000/api/contact/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"read","notes":"Follow up"}'

# Delete contact
curl -X DELETE http://localhost:3000/api/contact/1

# Get about info
curl http://localhost:3000/api/about

# Get all projects
curl http://localhost:3000/api/projects

# Get specific project
curl http://localhost:3000/api/projects/1

# Get all skills
curl http://localhost:3000/api/skills

# Get skills by category
curl http://localhost:3000/api/skills/Frontend
```

---

## Testing with Postman

1. Open Postman
2. Create a new collection
3. Add requests for each endpoint
4. Use environment variables for base URL
5. Test and save responses

---

## Notes

- **In-Memory Storage**: Currently, contact messages are stored in memory and will be lost on server restart
- **Production Database**: Replace in-memory storage with MongoDB, PostgreSQL, or Firebase
- **Authentication**: Consider adding auth for sensitive endpoints (e.g., DELETE, PUT)
- **Rate Limiting**: Add rate limiting for contact form to prevent spam
- **CORS**: Currently allows all origins (`*`). Restrict in production to your domain
