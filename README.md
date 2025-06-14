# 🚀 Employee Management System

The Employee Management System is a full-stack web application built to streamline and automate the management of employee records, leaves, salaries, and profiles. It offers two main dashboards: one for Admins to manage employees and operations, and another for Employees to view their own data and request leaves.

Built using **React.js** for the frontend and **Node.js + Express.js** for the backend, with **MongoDB** as the database. The system uses **JWT** for secure authentication and role-based access to ensure proper user segmentation.

### 🔧 Features

- **Admin Capabilities**: Add/edit/delete employees, manage salaries, view leave requests.
- **Employee Access**: Apply for leave, view salary slips, update personal profile.
- **Role-Based Dashboards**: Clean UI/UX with tailored navigation for Admins and Employees.
- **Authentication**: Secure login and token management using JWT.
- **Real-time Updates**: Reflect changes immediately across dashboards.
- **Responsive Design**: Optimized for both desktop and mobile devices.

### 🛠 Technologies Used

- **Frontend**: React.js, React Router DOM, Axios, Context API
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Tailwind CSS / Custom CSS
- **Version Control**: Git & GitHub

### 🚀 Getting Started

1. **Clone the Repository**
   - ```bash
   git clone https://github.com/venky4648/Employee-Management-System.git
   -cd Employee-Management-System

2. **Install Backend Dependencies**
   - ``bash
    - cd server
    - npm install
3. **Create a .env file inside the server/ folder**
   -  ``env
    - PORT=5000
    - MONGO_URI=your_mongodb_connection_string
    - JWT_SECRET=your_secret_key
4. **Start the backend server**
   -  ``bash

   -  npm start
5. **Install frontend dependencies**
   - ``bash
   -  cd ../frontend
    - npm install
6. **Run the frontend application**
    ``bash
     npm run dev
7. **Visit in browser**
    http://localhost:5173

         
