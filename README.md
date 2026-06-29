# 🚀 LinkNest

> A modern full-stack MERN Knowledge Management Platform that helps users organize, discover, and manage digital resources through collections, favorites, archives, search, analytics, and secure authentication.

![Status](https://img.shields.io/badge/Status-Active-success)
![Frontend](https://img.shields.io/badge/Frontend-Next.js-black)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Database](https://img.shields.io/badge/Database-MongoDB-success)
![Authentication](https://img.shields.io/badge/Auth-JWT-orange)

---

# 🌐 Live Demo

Frontend: `https://link-nest-app.vercel.app/`

Backend API: `Coming Soon`

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

---

## 📁 Smart Collections

* Create Collections
* Update Collections
* Delete Collections
* Organize Resources
* Collection-Based Navigation
* Cascade Deletion Support

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

---

## 📦 Archive System

* Archive Resources
* Restore Workflow Ready
* Workspace Cleanup

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

---

## 📊 Analytics Dashboard

Track:

* Total Resources
* Collections Count
* Favorite Resources
* Archived Resources
* Recent Activity

---

## 👤 User Profile

* Profile Overview
* User Information
* Dashboard Statistics
* Personalized Experience

---

## ⚙️ Settings Module

* Profile Settings
* Terms & Conditions
* Privacy Policy

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

# 🔒 Security

## Password Security

Passwords are hashed using bcrypt before storage.

## Authentication

JWT-based authentication protects private routes and APIs.

## Authorization

Ownership-based access control ensures users can only access their own resources.

---

# 📚 API Modules

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
* Drag & Drop Collections
* Team Collaboration
* Knowledge Graph Visualization
* Activity Tracking

---

# 🎯 Key Learnings

This project provided hands-on experience with:

* Full-Stack MERN Development
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

Full Stack MERN Developer

Focused on building scalable web applications, modern user experiences, and production-ready backend systems.

---

# ⭐ Support

If you found this project useful, consider giving it a star.
