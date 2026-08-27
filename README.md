# Quotation Management System

A full-stack Quotation Management System developed using React, Spring Boot, and MySQL.

## Features

* User Login
* Dashboard
* Customer Management
* Product Management
* Quotation Management
* Create Quotations
* View Quotations
* REST APIs
* MySQL Database
* Frontend and Backend Integration

## Technologies Used

### Frontend

* React.js
* JavaScript
* HTML
* CSS
* React Router
* Vite

### Backend

* Java
* Spring Boot
* Spring Data JPA
* REST API
* Maven

### Database

* MySQL

## Project Structure

```text
SoftwareQuotationSystem/
│
├── frontend/
│   └── React application
│
├── backend/
│   └── Spring Boot application
│
├── .gitignore
└── README.md
```

## Backend

The backend is developed using Spring Boot and provides REST APIs for the quotation management system.

The backend uses:

* Spring Boot
* Spring Data JPA
* Hibernate
* MySQL

The backend runs on port `8081`.

## Frontend

The frontend is developed using React.js and Vite.

The frontend communicates with the Spring Boot backend through REST APIs.

## Database

The application uses MySQL with the database:

```text
quotation_db
```

## How to Run

### 1. Start the Backend

Open a terminal in the backend folder:

```bash
cd backend
```

Run:

```bash
.\mvnw.cmd spring-boot:run
```

The backend runs on:

```text
http://localhost:8081
```

### 2. Start the Frontend

Open another terminal in the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Open the URL displayed by Vite in the terminal.

## Author

Shreya Ghadge
