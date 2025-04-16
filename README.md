# Cake Shop - Fullstack Project

Cake Shop is a fullstack e-commerce application for a dessert shop. It includes a customer-facing shopping experience and an admin dashboard for managing products, orders, and users.

## 🔧 Tech Stack

- **Frontend:** Vue 3, Vite, Pinia, TypeScript, Tailwind CSS
- **Backend:** Spring Boot, Spring Data JPA, MySQL
- **Deployment:** Firebase Hosting (Frontend), Render (Backend)

## 📁 Project Structure

```
cake-shop-project/
├── frontend/   # Vue 3 + Vite frontend app
├── backend/    # Spring Boot REST API backend
```

## 🚀 Getting Started

### Frontend (Vue 3)

```bash
cd frontend
npm install
npm run dev
```

### Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

> Make sure your database (e.g., MySQL) is running and configured in `application.properties`.

## 📦 Build and Deploy

### Frontend

```bash
npm run build
firebase deploy
```

### Backend

Deploy to platforms like Render, Railway, or any VPS with Java environment.

## 👤 Author

Created by **Luo Hao En**.  
Feel free to fork, contribute or reach out with any suggestions!
