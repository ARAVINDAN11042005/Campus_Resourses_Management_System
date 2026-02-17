# Campus Resource Management System

A full-stack system built with React, Node.js, and MySQL to manage college resources, students, and their transactions (Issue/Return).

## Tech Stack
- **Frontend**: React, Vite, Axios, Lucide-React, React Router
- **Backend**: Java, Spring Boot, Spring Data JPA, Hibernate, MySQL Connector
- **Database**: MySQL (relational with primary/foreign keys)

## Project Structure
```
/
├── backend-java/       # Spring Boot Server
│   ├── src/main/java/  # Java Source Code
│   ├── src/main/resources/ # application.properties
│   └── pom.xml         # Maven Dependencies
└── frontend/           # React App
```

## Setup Instructions

### 1. Database Setup
1. Open your MySQL client.
2. The application will automatically create the `campus_management` database and tables on startup based on the settings in `application.properties`.

### 2. Backend Setup (Java)
1. Navigate to `/backend-java`.
2. Open in your favorite IDE (IntelliJ, Eclipse, VS Code with Java Extension).
3. Run `mvn spring-boot:run` or run the `ManagementApplication.java` file.
4. The server starts on port 5000.

### 3. Frontend Setup
1. Navigate to `/frontend`.
2. Run `npm install`.
3. Run `npm run dev` (starts on Vite default port, usually 5174).

## Key Features
- **Dashboard**: Real-time stats of resources and students.
- **Resource Management**: CRUD operations for equipment, books, etc.
- **Student Management**: CRUD operations for student registration.
- **Issue/Return System**: Transactional system that auto-updates available quantity of resources.
