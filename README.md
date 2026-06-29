# 🚀 LinkNest

>A modern full-stack Knowledge Management Platform built with Next.js, Node.js, Express.js, and MongoDB Atlas that helps users organize, discover, and manage digital resources through collections, favorites, archives, search, analytics, and secure authentication.

![Status](https://img.shields.io/badge/Status-Active-success)
![Frontend](https://img.shields.io/badge/Frontend-Next.js-black)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Database](https://img.shields.io/badge/Database-MongoDB-success)
![Authentication](https://img.shields.io/badge/Auth-JWT-orange)

---

## 🌐 Live Demo

🔗 Frontend: https://link-nest-app.vercel.app/

🔗 Backend API: https://linknest-app-isbp.onrender.com/api

---

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
<img width="1887" height="911" alt="image" src="https://github.com/user-attachments/assets/95b04c5c-8807-4625-85cb-827bd994bd82" />

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
<img width="1880" height="911" alt="image" src="https://github.com/user-attachments/assets/0835605a-04a7-4463-a2b6-8d43480473c5" />

---

## 📦 Archive System

* Archive Resources
* Restore Workflow Ready
* Workspace Cleanup

<img width="1887" height="917" alt="image" src="https://github.com/user-attachments/assets/5400365d-3607-4a83-bc37-dfea87fd7036" />

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
  
<img width="373" height="802" alt="image" src="https://github.com/user-attachments/assets/b1ef35fe-0d46-49f5-84a6-7c58dac4e8d6" />

---

## 📊 Analytics Dashboard

Track:

* Total Resources
* Collections Count
* Favorite Resources
* Archived Resources
* Recent Activity
  <br/>
<img width="1907" height="915" alt="image" src="https://github.com/user-attachments/assets/ca3ff830-d89e-4835-a5b8-2b8ea451da01" />

---

## 👤 User Profile

* Profile Overview
* User Information
* Dashboard Statistics
* Personalized Experience
  <br/>
  <img width="1883" height="906" alt="image" src="https://github.com/user-attachments/assets/ece0f94d-b4ce-418c-9a20-3213a77048b8" />

---

## ⚙️ Settings Module

* Profile Settings
* Terms & Conditions
* Privacy Policy
  <br/>
<img width="1896" height="913" alt="image" src="https://github.com/user-attachments/assets/d679fec5-1ba1-45f0-abe7-0e77d4a312e4" />

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
  <img width="377" height="807" alt="image" src="https://github.com/user-attachments/assets/c2527b5b-ed11-4f57-8e3f-73ecc09a02d6" />
  
  <img width="361" height="803" alt="image" src="https://github.com/user-attachments/assets/26dcaac6-9d63-4eb6-957e-1003d43edd94" />



---

# 🏗 System Architecture

```text
Next.js Frontend
        │
        ▼
 REST APIs
        │
        ▼
 Express.js Backend
        │
        ▼
 Service Layer
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

![Frontend Hosting](https://img.shields.io/badge/Frontend-Vercel-black)
![Backend Hosting](https://img.shields.io/badge/Backend-Render-blue)

---
# 🔒 Security

## Password Security

Passwords are hashed using bcrypt before storage.

## Authentication

JWT-based authentication protects private routes and APIs.

## Authorization

Ownership-based access control ensures users can only access their own resources.
<br/>
<img width="1882" height="922" alt="image" src="https://github.com/user-attachments/assets/a364f0f7-d992-4b07-93b5-9f5298245062" />
<br/>
<img width="1881" height="917" alt="image" src="https://github.com/user-attachments/assets/1b0c2c71-7426-424a-b8e4-0066ccf2f655" />

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
```

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL
```

---



## 📚 API Modules

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

## Collections

```http
POST   /api/collections
GET    /api/collections
GET    /api/collections/:id
PATCH  /api/collections/:id
DELETE /api/collections/:id
```

## Links

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

## Dashboard

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

# 🚀 Future Enhancements

* AI Resource Summarization
* Browser Extension
* Public Collection Sharing
* Smart Recommendations
* Resource Metadata Preview
* Team Collaboration
* Activity Tracking
* Progressive Web App (PWA)
* Android APK using Capacitor
* Docker Containerization

---

# 🎯 Key Learnings

This project provided hands-on experience with:

* Full-Stack Application Development
* Next.js Application Architecture
* JWT Authentication
* REST API Design
* MongoDB Data Modeling
* Mongoose Populate
* Service Layer Architecture
* Search Implementation using Regex
* Protected Routes
* Dashboard Analytics
* Responsive UI Development
* Production Deployment Workflow

---

# 👩‍💻 Author

### Vanshika

Full Stack Web Developer

Focused on building scalable web applications, modern user experiences, and production-ready backend systems.

---

# ⭐ Support

If you found this project useful, consider giving it a star.
