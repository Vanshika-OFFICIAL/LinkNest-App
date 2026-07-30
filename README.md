# 🚀 LinkNest

> A production-ready full-stack Knowledge Management Platform built with Next.js, Express.js, MongoDB Atlas, and JWT Authentication that helps users organize, search, favorite, archive, and manage digital resources through intelligent collections.

![Status](https://img.shields.io/badge/Status-Active-success)
![Frontend](https://img.shields.io/badge/Frontend-Next.js-black)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Database](https://img.shields.io/badge/Database-MongoDB-success)
![Authentication](https://img.shields.io/badge/Auth-JWT-orange)

---

### Demo Account

Use the following credentials to explore the application:

**Email:** `test@gmail.com`  
**Password:** `Test123`

---
## 📑 Table of Contents

- Overview
- Problem Statement
- Solution
- Features
- Screenshots
- Architecture
- Tech Stack
- Deployment
- API
- Installation
- Future Scope
  

# 📖 Overview

LinkNest is a Personal Knowledge Hub designed for developers, students, researchers, and professionals who frequently save online resources such as documentation, tutorials, courses, articles, tools, and references.

Traditional browser bookmarks become cluttered over time and make resource retrieval difficult. LinkNest solves this problem through structured collections, advanced search, favorites, archives, dashboard analytics, and secure user-specific organization.

---

# ❌ Problem Statement

As the number of saved resources grows:

* Important resources become difficult to locate.
* Browser bookmarks become unmanageable.
* Categorization options are limited.
* There is no dashboard for tracking resources.
* Productivity decreases due to inefficient information retrieval.

---

# 💡 Solution

LinkNest provides:

* Structured resource collections
* Resource tagging
* Favorites system
* Archive workflow
* Powerful search engine
* Dashboard analytics
* Secure authentication
* User-specific resource management

---

# ✨ Core Features

## 🔐 Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Persistent Sessions
* Secure Password Hashing (bcrypt)

---

## 🏠 Premium Landing Experience

* Modern SaaS Landing Page
* Responsive Design
* Authentication CTA
* Product Showcase
* Feature Sections
* About Section
* Premium UI Components
  <br/>
<img width="1892" height="912" alt="image" src="https://github.com/user-attachments/assets/b5970dd7-ac0d-4939-ac0a-85004da4c667" />

<br/>
<img width="1882" height="910" alt="image" src="https://github.com/user-attachments/assets/afc27e03-9b49-4ff0-b6a2-7ccd4854736a" />

<br/>
---

## 📁 Smart Collections

* Create Collections
* Update Collections
* Delete Collections
* Organize Resources
* Collection-Based Navigation
* Cascade Deletion Support
  <br/>
  <img width="1883" height="917" alt="image" src="https://github.com/user-attachments/assets/99307488-dff7-4a1c-a8e9-c8dc91de23d7" />

---

## 🔗 Resource Management

* Save Links
* Edit Resources
* Delete Resources
* Resource Descriptions
* Resource Tags
* Collection Assignment

---

## ⭐ Favorites

* Mark Important Resources
* Dedicated Favorites Section
* Quick Resource Retrieval
  <br/>
  <img width="1903" height="911" alt="image" src="https://github.com/user-attachments/assets/0213cd41-e069-452e-acbb-bfbd50bdcae7" />

---

## 📦 Archive System

* Archive Resources
* Restore Workflow Ready
* Workspace Cleanup
<img width="1910" height="918" alt="image" src="https://github.com/user-attachments/assets/c10a36e4-442f-4e1f-bf33-222344082288" />

---

## 🔍 Advanced Search

Search resources using:

* Title
* Description
* Tags
* Collection Names

Features:

* Real-Time Search
* Search Suggestions
* Global Resource Discovery
  
  <img width="1883" height="907" alt="image" src="https://github.com/user-attachments/assets/f79af6c6-a5ab-461f-b26f-370ea276b394" />

---

## 📊 Analytics Dashboard

Track:

* Total Resources
* Collections Count
* Favorite Resources
* Archived Resources
* Recent Activity
  <br/>
<img width="1886" height="912" alt="image" src="https://github.com/user-attachments/assets/e9fba6b0-860b-40e9-a734-c4c2c66acfb3" />

---

## 👤 User Profile

* Profile Overview
* User Information
* Dashboard Statistics
* Personalized Experience
* Avatar Upload
* Cloudinary Image Storage
* Profile Picture Management
  
  <br/>
  <img width="1901" height="922" alt="image" src="https://github.com/user-attachments/assets/0e660a1a-4125-40d6-b37f-538455940f02" />

---

## ⚙️ Settings Module

* Profile Settings
* Terms & Conditions
* Privacy Policy
  <br/>
  <img width="1876" height="910" alt="image" src="https://github.com/user-attachments/assets/001b8709-d132-444f-836b-c995b3795a90" />

---

## 📱 Responsive Experience

Optimized for:

* Desktop
* Tablet
* Mobile Devices

Includes:

* Mobile Sidebar
* Mobile Search
* Responsive Dashboard
* Responsive Authentication Pages
<br/>
<img width="371" height="807" alt="image" src="https://github.com/user-attachments/assets/16dba4db-afcb-4c99-a9e7-eb1f1406893a" />
<br/>

<img width="375" height="802" alt="image" src="https://github.com/user-attachments/assets/a96c3e6a-4c91-4bed-bf1c-fb994418ae73" />



---

# 🏗 System Architecture

```text
Browser
      │
      ▼
Next.js Frontend
      │
 REST APIs
      │
      ▼
Express.js Backend
      │
      ▼
Business Logic
      │
      ├────────► Cloudinary
      │
      ▼
MongoDB Atlas
```

---

# 📂 Project Structure

```text
LinkNest
│
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── services
│   │   ├── context
│   │   └── assets
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── validations
│
└── README.md
```

---

# 🛠 Tech Stack

## Frontend

* Next.js 15
* React.js
* Tailwind CSS
* Framer Motion
* Axios
* Lucide React
* Cloudinary
* Multer

---

## Backend

* Node.js
* Express.js
* REST APIs

---

## Database

* MongoDB Atlas
* Mongoose

---

## Authentication

* JWT
* bcryptjs
* Forgot Password
* Reset Password
* Token Validation
* Persistent Login
  
---

## Development Tools

* Git
* GitHub
* Postman
* MongoDB Compass
* VS Code

---
# 🚀 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Image Storage | Cloudinary |

![Frontend Hosting](https://img.shields.io/badge/Frontend-Vercel-black)
![Backend Hosting](https://img.shields.io/badge/Backend-Render-blue)
![Database](https://img.shields.io/badge/Database-MongoDB-success)
![Cloudinary](https://img.shields.io/badge/Image-Cloudinary-blue)

---
# 🔒 Security

## Password Security

- Passwords are securely hashed using **bcrypt** before storage.

## Authentication

- JWT-based Authentication
- Persistent User Sessions
- Protected API Routes
  
<img width="1890" height="930" alt="image" src="https://github.com/user-attachments/assets/c7a6f9a0-e8cd-4a28-8bd8-46d5be7008a2" />

<br/>
<img width="1890" height="915" alt="image" src="https://github.com/user-attachments/assets/fbf8489f-b952-418f-8c59-fa5f6750fdf2" />

## Authorization

- Ownership-based access control
- Users can only access and modify their own collections and resources.

## Password Recovery

- Secure Forgot Password Flow
- Reset Password using Time-Limited Tokens
  
<img width="1891" height="913" alt="image" src="https://github.com/user-attachments/assets/a1f68c06-cebf-4ace-87bd-6ff18f6eab2e" />


## Image Security

- Avatar images are securely stored using **Cloudinary**.

---
# ⚙️ Local Setup

## Clone Repository

```bash
git clone https://github.com/Vanshika-OFFICIAL/LinkNest-App.git
cd LinkNest-App
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
npm run dev
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT
MONGO_URI
JWT_SECRET
FRONTEND_URL
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL
```

---



## 📚 API Modules

## 🔐 Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

POST /api/auth/forgot-password
POST /api/auth/reset-password
```

## 📁 Collections

```http
POST   /api/collections
GET    /api/collections
GET    /api/collections/:id
PATCH  /api/collections/:id
DELETE /api/collections/:id

GET    /api/collections/totals
```

## 🔗 Links

```http
POST   /api/links
GET    /api/links
GET    /api/links/:id

GET    /api/links/collection/:collectionId

PATCH  /api/links/:id
DELETE /api/links/:id

PATCH  /api/links/:id/favorite
PATCH  /api/links/:id/archive

GET    /api/links/favorites
GET    /api/links/archived

GET    /api/links/search
```

## 📊 Dashboard

```http
GET /api/dashboard/stats
```

---

# ⚔️ Why LinkNest?

| Feature             | Browser Bookmarks | LinkNest |
| ------------------- | ----------------- | -------- |
| Collections         | ✅                 | ✅        |
| Favorites           | ❌                 | ✅        |
| Archive System      | ❌                 | ✅        |
| Search              | Limited           | ✅        |
| Tags                | ❌                 | ✅        |
| Dashboard Analytics | ❌                 | ✅        |
| Authentication      | ❌                 | ✅        |
| User-Specific Data  | ❌                 | ✅        |
| Resource Management | ❌                 | ✅        |

---
# 🚧 Engineering Challenges

During development, several engineering challenges were addressed:

- Designing scalable MongoDB schemas
- Implementing JWT Authentication and Protected Routes
- Building secure Forgot & Reset Password workflow
- Managing image uploads with Cloudinary
- Handling ownership-based authorization
- Designing reusable React components
- Implementing responsive dashboard layouts
- Optimizing collection link count using MongoDB queries
- Deploying frontend and backend separately using Vercel & Render
- Managing production environment variables

  
# 🚀 Future Enhancements

- AI Resource Summarization
- Browser Extension
- Public Collection Sharing
- Smart Recommendations
- AI-powered Tag Suggestions
- Team Collaboration
- Resource Metadata Preview
- Activity Timeline
- Progressive Web App (PWA)
- Docker Containerization
- Offline Support
- Dark / Light Theme

---

# 🎯 Key Learnings

Building LinkNest provided practical experience with:

- Full-Stack Application Development
- Next.js App Router
- REST API Design
- Express.js Backend Architecture
- MongoDB Data Modeling
- Mongoose Relationships
- JWT Authentication & Authorization
- Secure Password Recovery
- Cloudinary Image Upload
- Responsive UI Development
- Service Layer Architecture
- Production Deployment with Vercel & Render
- Environment Variable Management
- Git & GitHub Workflow
---

# 👩‍💻 Author

### Vanshika

Full Stack Web Developer

Focused on building scalable web applications, modern user experiences, and production-ready backend systems.

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

Feedback, suggestions, and contributions are always welcome!
