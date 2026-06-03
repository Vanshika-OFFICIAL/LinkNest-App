# 🚀 LinkNest

> A full-stack MERN resource management platform for organizing, searching, favoriting, and archiving bookmarks through collections, tags, and dashboard analytics.

![Status](https://img.shields.io/badge/Status-Active-success)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Database](https://img.shields.io/badge/Database-MongoDB-green)
![Authentication](https://img.shields.io/badge/Auth-JWT-orange)

---

## 📖 Overview

LinkNest is a modern bookmark and resource management platform designed for developers, students, researchers, and professionals who consume large amounts of online content.

Instead of relying on traditional browser bookmarks, LinkNest provides a structured system for organizing resources using collections, favorites, archives, tags, search, and analytics.

---

## ❌ Problem Statement

As users accumulate hundreds of bookmarks over time:

* Important resources become difficult to find.
* Browser bookmarks become cluttered.
* Categorization is limited.
* There is no centralized dashboard for managing knowledge resources.
* Productivity decreases due to inefficient resource retrieval.

---

## 💡 Solution

LinkNest solves these problems by providing:

* Collection-based organization
* Advanced search capabilities
* Favorites system
* Archive system
* Dashboard analytics
* User-specific secure resource management

---

## ✨ Key Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* User Profile Retrieval

---

### 📁 Collections Management

* Create Collections
* View Collections
* Update Collections
* Delete Collections
* Cascade Delete Support

---

### 🔗 Link Management

* Save Resources
* Update Resources
* Delete Resources
* Categorize Resources
* Collection Assignment

---

### ⭐ Favorites

* Mark Important Resources
* Quick Access System
* Favorite Resource Retrieval

---

### 📦 Archive System

* Archive Inactive Resources
* Restore Workflow Ready
* Workspace Cleanup

---

### 🔍 Search

Search resources by:

* Title
* Description
* Tags

---

### 📊 Dashboard Analytics

Track:

* Total Links
* Favorite Links
* Archived Links
* Collections

---

## 🏗 Architecture

```text
Frontend (React)
       ↓
REST APIs
       ↓
Express.js
       ↓
Service Layer
       ↓
MongoDB Atlas
```

### Backend Structure

```text
Routes
 ↓
Controllers
 ↓
Services
 ↓
Models
 ↓
MongoDB
```

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT
* bcryptjs

### Tools

* Postman
* Git
* GitHub

---

## 🔒 Security

### Password Security

Passwords are hashed using bcryptjs before being stored.

### Authentication

JWT-based authentication secures protected routes.

### Authorization

Ownership-based access control ensures users can only access their own resources.

---

## 📚 API Modules

### Auth

```http
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

### Collections

```http
POST   /api/collections
GET    /api/collections
GET    /api/collections/:id
PATCH  /api/collections/:id
DELETE /api/collections/:id
```

### Links

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

### Dashboard

```http
GET /api/dashboard/stats
```

---

## ⚔️ Why LinkNest Over Browser Bookmarks?

| Capability          | Browser Bookmarks | LinkNest |
| ------------------- | ----------------- | -------- |
| Collections         | ✅                 | ✅        |
| Favorites           | ❌                 | ✅        |
| Archive             | ❌                 | ✅        |
| Dashboard Analytics | ❌                 | ✅        |
| Advanced Search     | Limited           | ✅        |
| Tags                | ❌                 | ✅        |
| Authentication      | ❌                 | ✅        |
| User-Specific Data  | ❌                 | ✅        |
| Resource Management | ❌                 | ✅        |

---

## 🚀 Future Enhancements

* Browser Extension
* AI-Powered Categorization
* Smart Recommendations
* Activity Tracking
* Team Collaboration
* Link Metadata Preview
* Cross-Device Preference Sync

---

## 🎯 Key Learnings

This project helped me gain practical experience with:

* REST API Design
* JWT Authentication
* Authorization
* MongoDB Relationships
* Mongoose Populate
* Service Layer Architecture
* Search using Regex
* Dashboard Analytics
* Cascade Deletion
* Production-Oriented Backend Design

---

## 👨‍💻 Author

**Vanshika**

Built as a full-stack MERN project focused on scalable architecture, secure authentication, and efficient resource management.
