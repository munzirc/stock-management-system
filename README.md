# 📦 Stock Management System

A full-stack web application to manage and track products, monitor stock levels, analyze sales trends, and streamline inventory control — all in one place. Built with the MERN stack and a clean, responsive UI.

---

## 🚀 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Material UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Charts**: Chart.js via react-chartjs-2
- **Authentication**: JWT (stored in HttpOnly Cookies)

---

## ✨ Features

- ✅ **Product Management**
  - Create, Update, Delete products with category & price
- 📊 **Stock Overview**
  - View stock levels, low-stock alerts, and slow-moving products
- 📈 **Analytics Dashboard**
  - Revenue Trends
  - Sales Over Time
  - Top Selling Products
  - Category Distribution
- 🔍 **Smart Filtering & Search**
  - Filter by category, keyword, date range, etc.
- 📅 **Export Reports**
  - Export stock and sales reports to CSV format
- 📲 **Low Stock Alerts**
  - Notification system for low stock levels (alerts displayed within the app)

---

## 🔐 Authentication

- JWT-based auth with HttpOnly cookies
- CORS supported for frontend-backend communication
- First-time setup creates a default admin user:
- Login
  - Username: admin  
  - Password: admin@123



🛠️ Setup Instructions:

1. Clone the Repository
```bash
>> git clone https://github.com/munzirc/stock-management-system.git
>> cd stock-management-system
```
2. Create Environment Variables
```bash
# Copy .env.example in both frontend and backend folders
# Create a .env file in each and add your own values
```

3. Start Frontend:
```bash
>>stock-management-system>> cd frontend
>>stock-management-system>>frontend>> npm install
>>stock-management-system>>frontend>> npm run dev
# runs on http://localhost:5173
```
4. Start Backend:
```bash
>>stock-management-system>> cd  backend
>>stock-management-system>>backend>> npm install
>>stock-management-system>>backend>> npm run dev
# runs on http://localhost:5000
```

🌐 Hosted Version: https://stock-management-system-frontend-gilt.vercel.app/

📌 Future Improvements

- Role-based access (admin vs staff)
- Implement email or push notifications for low stock alerts
