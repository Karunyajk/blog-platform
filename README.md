# 📝 Blog Platform

A full-stack Blog Platform developed using Java, Spring Boot, PostgreSQL, HTML, CSS, and JavaScript.

## 🚀 Features

- User Registration
- User Login
- Create and manage blog posts
- View blog posts
- View comments
- Add comments to blog posts
- REST API integration
- PostgreSQL database integration
- Frontend and backend integration
- API testing using Postman

## 🛠️ Technologies Used

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Spring Security
- REST API

### Frontend
- HTML
- CSS
- JavaScript

### Database
- PostgreSQL

### Tools
- VS Code
- Postman
- Git
- GitHub

## 🔌 API Endpoints

### User APIs

POST `/api/users/register`

POST `/api/users/login`

### Post APIs

GET `/api/posts`

GET `/api/posts/{id}`

### Comment APIs

GET `/api/posts/{postId}/comments`

POST `/api/posts/{postId}/comments/{userId}`

## 🧪 API Testing

The REST APIs were tested using Postman.

The following features were tested successfully:

- User registration
- User login
- Fetching blog posts
- Fetching comments
- Adding comments

## ▶️ How to Run

1. Clone the repository.

2. Open the project in VS Code or any Java IDE.

3. Configure PostgreSQL in:

`src/main/resources/application.properties`

4. Start the Spring Boot backend.

5. Open the frontend using Live Server.

6. Access the application through the browser.

## 📂 Project Structure

```text
blog-platform
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── src
│   ├── main
│   │   ├── java
│   │   └── resources
│   └── test
│
├── pom.xml
└── README.md
