# 📚 Book Management App

This is a full-stack CRUD (Create, Read, Update, Delete) application for managing books. It is built using **Angular 16** for the frontend and **Laravel 10** for the backend.

## 🗂️ Project Structure

book-app/
├── front/ # Angular 16 frontend application
├── back/ # Laravel 10 backend (REST API)
└── README.md # Project documentation (this file)

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure you have the following installed:

- Node.js & npm
- Angular CLI (`npm install -g @angular/cli`)
- PHP >= 8.1
- Composer
- MySQL
- XAMPP or Laravel Valet (for local development)

---

## 🖥️ Backend Setup (Laravel 10)

```bash
cd back
composer install
cp .env.example .env
php artisan key:generate
```
⚙️ Configure .env File
Edit the .env file to connect to your MySQL database named books:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=books        # ✅ Your MySQL database name
DB_USERNAME=root         # Change if needed
DB_PASSWORD=             # Add password if applicable

Then run the database migrations:

```bash
php artisan migrate
php artisan serve
```
The backend API will run at:
http://localhost:8000

🌐 Frontend Setup (Angular 16)
```bash
cd front
npm install
ng serve
```
The frontend app will run at:
http://localhost:4200

✅ Important: In your Angular service (book.service.ts), ensure the API base URL is:

private apiUrl = 'http://localhost:8000/api/books';
Also make sure CORS is configured in Laravel to allow requests from Angular (http://localhost:4200).

🔄 API Endpoints
Method	Endpoint	Description
GET	/api/books	Get all books
GET	/api/books/{id}	Get book by ID
POST	/api/books	Add a new book
PUT	/api/books/{id}	Update a book
DELETE	/api/books/{id}	Delete a book

🧩 Features
View a list of all books

Add new books

Edit existing books

Delete books

Angular frontend with Angular Material UI

Laravel backend with RESTful API

🛠 Technologies Used
Frontend: Angular 16, Angular Material, TypeScript

Backend: Laravel 10, PHP 8.1+, Eloquent ORM, MySQL

Tools: Composer, npm, XAMPP


